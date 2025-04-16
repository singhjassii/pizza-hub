/* eslint-disable style/indent-binary-ops */
import { ErrorMessage } from "@hookform/error-message";

import { useDeferredValue, useEffect, useState } from "react";

import { MagnifierIcon, XmarkIcon } from "../../../Icons/indexIcon";

import TextError from "./TextError";

const CheckBoxComp = ({
  watch,
  item,
  selectItem,
  name,
  parentPermission,
  parentpermissionNameIndex,
  childrenIndex,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id={item.permissionName}
        className="size-[10]"
        // disabled={parentPermission ? true : false}
        checked={watch(name).includes(item.id)}
        onChange={(e) => {
          selectItem(
            item,
            e.target.checked,
            childrenIndex,
            parentpermissionNameIndex
          );
        }}
      />
      {/* <div className="bg-red-500 size-10"></div> */}
      <label
        htmlFor={item.permissionName}
        className={`text-field-text-color font-medium ${parentPermission && "text-gray-500"}`}
      >
        {item.permissionName}
      </label>
    </>
  );
};
function MultiSelect({ label, options, name, watch, setValue, errors }) {
  const [searchPermissions, setSearchPermissions] = useState("");
  const deferredSearchPermissions = useDeferredValue(searchPermissions);
  const [permissionsList, setPermissionsList] = useState(options);
  function filterList() {
    const filteredPermissions = options.filter(
      (item) =>
        item.permissionName
          .toLowerCase()
          .includes(deferredSearchPermissions.trim()) ||
        (item.children &&
          item.children.find((subItem) =>
            subItem.permissionName
              .toLowerCase()
              .includes(deferredSearchPermissions.trim())
          ))
    );
    setPermissionsList(filteredPermissions);
  }
  useEffect(() => {
    filterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredSearchPermissions]);
  function selectItem(item, checked, childrenIndex, parentIndex) {
    let childrens;
    if (checked) {
      if (childrenIndex !== undefined) {
        const arr = [...watch(name), item.id, options[parentIndex].id];
        setValue(name, [...new Set(arr)]);
      } else {
        childrens = item.children.map(({ id }) => id);
        setValue(name, [...watch(name), item.id, ...childrens]);
      }
    } else {
      if (childrenIndex !== undefined) {
        const atIndexDelete = watch(name).findIndex((id) => id === item.id);
        watch(name).splice(atIndexDelete, 1);
        if (parentIndex !== undefined) {
          const remainingPermissions = options[parentIndex].children.filter(
            (item) => watch(name).includes(item.id)
          );
          if (remainingPermissions.length === 0) {
            const parentToDeleteIndex = watch(name).findIndex(
              (id) => id === options[parentIndex].id
            );
            watch(name).splice(parentToDeleteIndex, 1);
          }
        }
        setValue(name, [...watch(name)]);
      } else {
        const childrens = item.children.map(({ id }) => id);
        const toRemoveRoles = [item.id, ...childrens];
        const remainingPermissions = watch(name).filter(
          (id) => !toRemoveRoles.includes(id)
        );
        setValue(name, remainingPermissions);
      }
    }
  }
  return (
    <>
      <div className="form-control h-full relative mb-5">
        <input
          type="text"
          name={name}
          value={deferredSearchPermissions}
          className="bg-transparent text-field-text-color !rounded-b-none"
          onChange={(e) => {
            setSearchPermissions(e.target.value);
            filterList();
          }}
        />
        <button
          type="button"
          className={`absolute size-5 text-field-text-color top-4 right-5 ${
            deferredSearchPermissions.length > 0
              ? "cursor-pointer"
              : "cursor-default"
          }`}
          onClick={() =>
            deferredSearchPermissions.length > 0 && setSearchPermissions("")
          }
        >
          {deferredSearchPermissions.length === 0 ? (
            <MagnifierIcon />
          ) : (
            <XmarkIcon />
          )}
        </button>
        <label
          htmlFor={name}
          className={`absolute top-[27%] -z-10 left-0 ml-2 px-2 text-[#697177] cursor-text select-none ${
            searchPermissions &&
            "placeHolderAnimationActive text-[#0072f5] bg-page-bg-color z-10"
          }`}
        >
          {label}
        </label>
      </div>
      <div className="relative">
        <div className="h-[300px] multiSelect -mt-10  select-none rounded-[5px] justify-start rounded-t-none flex flex-col gap-2 overflow-y-scroll p-5">
          {permissionsList.length > 0 &&
            permissionsList.map((parentItem, parentIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={parentIndex} className="">
                <div className="flex gap-2 items-center">
                  <CheckBoxComp
                    item={parentItem}
                    watch={watch}
                    selectItem={selectItem}
                    name={name}
                    parentPermission={!!parentItem.children.length}
                  />
                </div>

                {parentItem.children.length > 0 && (
                  <div className="flex flex-col gap-1 mt-2">
                    {parentItem.children.map((item, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div className="flex gap-2 items-center ml-7" key={index}>
                        <CheckBoxComp
                          item={item}
                          watch={watch}
                          selectItem={selectItem}
                          name={name}
                          parentpermissionNameIndex={parentIndex}
                          childrenIndex={index}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          {permissionsList.length === 0 && (
            <div className="h-full flex justify-center items-center">
              <p className="font-bold text-field-text-color">
                No results for &quot;
                {deferredSearchPermissions}
                &quot;
              </p>
            </div>
          )}
        </div>
        <ErrorMessage errors={errors} name={name} render={TextError} />
      </div>
      {/* <div className="w-full h-[100px] bg-red-500"></div> */}
    </>
  );
}

export default MultiSelect;
