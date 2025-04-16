"use server";

import { addOrder } from "@/controllers/order.controller";
import {
  deleteByIds,
  getBypage,
  restoreSoftDeleted,
  searchByPages,
} from "@/controllers/shared/common.controllers";
import {
  checkAuth,
  loginUser,
  signUpUser,
  verifyOtp,
} from "@/controllers/user.controller";
import { revalidatePath } from "next/cache";

async function getRows(resource, page, limit, search, isFetchingBin = false) {
  const getData = search ? searchByPages : getBypage;
  return getData(
    {
      resource,
      raw: true,
    },
    isFetchingBin
  )({
    query: {
      page,
      limit,
      search,
    },
  });
}
async function softDeleteRows(resource, path) {
  return async function (ids) {
    "use server";
    await deleteByIds({
      resource,
    })({
      body: { ids },
    });
    revalidatePath(path);
  };
}
async function permanentDeleteRows(resource, path) {
  return async function (ids) {
    "use server";
    await deleteByIds(
      {
        resource,
      },
      true
    )({
      body: { ids },
    });
    revalidatePath(path);
  };
}
async function restoreDeletedRows(resource, path) {
  return async function (ids) {
    "use server";
    await restoreSoftDeleted({
      resource,
    })({
      body: { ids },
    });
    revalidatePath(path);
  };
}
async function loginUserSubmitHandler(values) {
  try {
    const token = await loginUser({ body: values });
    return { token };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
async function signUpUserSubmitHandler(values) {
  try {
    const res = await signUpUser({ body: values });
    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
async function otpVerificationSubmitHandler(values, _, otpEmail) {
  try {
    const token = await verifyOtp({ body: { email: otpEmail, ...values } });
    return { token };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
async function getLoggedInUserDetails() {
  return async function (token) {
    "use server";
    try {
      const userDetails = await checkAuth({ body: { token } });
      return userDetails;
    } catch (error) {
      console.error(error);
    }
  };
}
async function orderConfirm(body) {
  try {
    await addOrder({ body });
  } catch (error) {
    console.error(error);
    return { error };
  }
}
export {
  getLoggedInUserDetails,
  getRows,
  loginUserSubmitHandler,
  orderConfirm,
  otpVerificationSubmitHandler,
  permanentDeleteRows,
  restoreDeletedRows,
  signUpUserSubmitHandler,
  softDeleteRows,
};
