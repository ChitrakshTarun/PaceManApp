// hooks/useLiverunsData.ts
import { apiToPace, paceSort } from "@/lib/utils/converters";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useEffect } from "react";

interface LiverunsDataParams {
  gameVersion?: string;
  liveOnly?: boolean;
}

export const useLiverunsData = ({ gameVersion, liveOnly }: LiverunsDataParams) => {
  const isFocusedRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      isFocusedRef.current = true;
      return () => {
        isFocusedRef.current = false;
      };
    }, [])
  );

  const { data, refetch, ...rest } = useQuery({
    queryKey: ["liveruns", gameVersion, liveOnly],
    queryFn: async () => {
      const response = await fetch(
        `https://paceman.gg/api/ars/liveruns?gameVersion=${gameVersion}&liveOnly=${liveOnly ? "true" : "false"}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const res = (await apiToPace(data)).sort(paceSort);
      return res;
    },
    enabled: true,
    refetchInterval: isFocusedRef.current ? 10000 : false,
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
    staleTime: 10000,
  });

  useEffect(() => {
    refetch();
  }, [gameVersion, liveOnly, refetch]);

  return { data, refetch, ...rest };
};
