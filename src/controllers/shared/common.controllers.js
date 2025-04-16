import ErrorResponse from "@/utils/errorResponse.js";
import Sequelize from "sequelize";
import resources from "../../config/resources.js";
import { RESPONSE_LIMIT } from "../../constants/common";

const Op = Sequelize.Op;

const isAttributeSearchable = (Model, attribute) =>
  Model.rawAttributes[attribute] &&
  Model.rawAttributes[attribute].type instanceof Sequelize.STRING;

export const getBypage = (
  { resource, limit_from_p, raw = false, distinct = false },
  isFetchingBin = false
) => {
  const {
    model: Model,
    attributes,
    include,
    order,
    where = {},
  } = resources[resource];
  return async (req) => {
    try {
      const page = Number.parseInt(req?.query?.page) || 1;
      const limit = Number.parseInt(req?.query?.limit) || RESPONSE_LIMIT;
      let whereCondition = where;
      const queryConfig = {
        limit,
        offset: limit * (page - 1),
        paranoid: true,
        raw,
        distinct,
      };
      if (limit_from_p) {
        delete queryConfig.limit;
        delete queryConfig.offset;
      }
      if (isFetchingBin) {
        queryConfig.paranoid = false;
        whereCondition = {
          ...where,
          deleted_at: { [Op.ne]: null },
        };
      }
      if (attributes) {
        queryConfig.attributes = attributes;
      }
      if (include) {
        queryConfig.include = include;
      }
      if (order) {
        queryConfig.order = order;
      }
      if (Object.keys(whereCondition).length) {
        queryConfig.where = whereCondition;
      }
      const data = await Model.findAndCountAll(queryConfig);

      return data;
    } catch (err) {
      console.error({ err });
      throw new Error(`error occured while fetching ${err}`);
    }
  };
};

export const searchByPages =
  ({ resource, raw = false }, isSearchingBin) =>
  async (req) => {
    try {
      const {
        model: Model,
        attributes = [],
        include = [],
        order = [],
      } = resources[resource];
      const page = Number.parseInt(req.query.page) || 1;
      const limit = Number.parseInt(req.query.limit) || RESPONSE_LIMIT;
      const searchTerm = req.query.search?.trim();

      if (!searchTerm) {
        ErrorResponse("Please provide a search term", 400);
      }

      // Filter attributes to those that are strings
      const stringAttributes = attributes.filter((attribute) =>
        isAttributeSearchable(Model, attribute)
      );

      // Constructing the main search conditions
      const mainSearchConditions = stringAttributes.map((attribute) => ({
        [attribute]: { [Op.iLike]: `%${searchTerm}%` },
      }));

      const includeSearchArray = include.map((includeConfig) =>
        includeConfig.attributes
          .filter((attribute) =>
            isAttributeSearchable(includeConfig.model, attribute)
          )
          .map((attribute) => ({
            [`$${includeConfig.as}.${attribute}$`]: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          }))
      );
      const includeSearchCondition = includeSearchArray.reduce(
        (acc, arr) => [...acc, ...arr],
        []
      );
      const queryConfig = {
        where: mainSearchConditions.length
          ? { [Op.or]: [...mainSearchConditions, ...includeSearchCondition] }
          : {},
        attributes,
        limit,
        offset: limit * (page - 1),
        paranoid: !isSearchingBin,
        include,
        order,
        raw,
      };

      if (isSearchingBin) {
        queryConfig.where.deleted_at = { [Op.ne]: null };
      }
      const data = await Model.findAndCountAll(queryConfig);
      return data;
    } catch (error) {
      console.error({ error });
      throw new Error(`error occured while searching ${error}`);
    }
  };

export const deleteByIds =
  ({ resource }, isForceDelete = false) =>
  async (req) => {
    try {
      const { model: Model } = resources[resource];
      const { ids } = req.body;
      await Model.destroy({
        where: { id: ids },
        force: isForceDelete,
      }); // Force deletion to permanently remove the role and related entries
      return `Data deleted ${isForceDelete ? "Permanently" : "Temporarly"}`;
    } catch (error) {
      console.error({ error });
      throw new Error(`error occured while deleting ${error}`);
    }
  };

export const restoreSoftDeleted =
  ({ resource }) =>
  async (req) => {
    try {
      const { model: Model } = resources[resource];
      const { ids } = req.body;
      // Restore the soft-deleted role by setting deletedAt to null
      await Model.restore({ where: { id: ids } });

      return "Data restored successfully";
    } catch (error) {
      console.error({ error });
      throw new Error(`error occured while restoring ${error}`);
    }
  };
