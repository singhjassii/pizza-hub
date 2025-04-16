import { useQueries } from "@tanstack/react-query";

// WithApiData.tsx
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import Loader from "../shared/Loader";

function WithApiData(BaseComponent, { queries = [] }) {
  // Define the inner component that will use hooks
  return function WrappedComponent(props) {
    const accessToken = localStorage.getItem("accessToken");
    const { permission } = useSelector(
      (state) => state.loggedInUserDetails.user
    );
    const { branch } = useSelector((state) => state.selectedBranch);
    const params = useParams();
    const { state } = useLocation();
    const apiQueries = queries
      .filter(({ permissionRequired }) =>
        !permissionRequired
          ? true
          : permission.rows?.some(
              ({ permission }) => permission.id === permissionRequired
            )
      )
      .map(({ queryKey, url, transformData }) => {
        let finalQueryKey = queryKey;
        if (typeof queryKey === "function") {
          finalQueryKey = queryKey(
            params,
            state?.url || null,
            state?.previousPlanId || null
          );
        }
        let apiUrl = url;
        if (typeof url === "function") {
          apiUrl = url(
            params,
            state?.url || null,
            state?.previousPlanId || null,
            branch || null
          );
        }
        return {
          queryKey: finalQueryKey,
          queryFn: async () => {
            const response = await fetch(apiUrl, {
              headers: { Authorizations: `Bearer ${accessToken}` },
            });
            const data = await response.json();
            return transformData ? transformData(data) : data;
          },
          staleTime: 100000000000000, // Consider configuring staleTime as appropriate for your app
        };
      });
    // Mapping queries to be used in useQueries
    const results = useQueries({
      queries: apiQueries,
    });
    // Check if any of the queries are loading
    const isLoading = results.some(({ isLoading }) => isLoading);
    // Show the loading component if any queries are loading
    if (isLoading) {
      return <Loader />;
    }
    const isError = results.some(({ error }) => error);
    if (isError) {
      throw new Error("Something went wrong while fetching the data");
    }
    // Process query results
    const data = results.reduce((acc, { data, error, isLoading }, index) => {
      acc[queries[index].name] = { data, error, isLoading };
      return acc;
    }, {});

    // Pass query results to the wrapped component
    return <BaseComponent {...props} queryResults={data} />;
  };
}

export default WithApiData;
