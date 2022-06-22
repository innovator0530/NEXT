import { useCallback, useRef, useState } from "react";

// Calls refetch when the last element is visible
// Set the "lastElementRef" to the last list item

export const usePagination = (refetch:()=>Promise<void>,isLoading:boolean, hasMore:boolean)=>{

	const intersectionObserver = useRef<IntersectionObserver|undefined>();
	// Gets called every time the last notification was loaded:
	const lastElementRef = useCallback((el)=>{
        if(isLoading) return;
		if(intersectionObserver.current) intersectionObserver.current.disconnect();
		intersectionObserver.current = new IntersectionObserver(entries=>{
			if(entries[0].isIntersecting){
				refetch()
			}
		})
		if(el) intersectionObserver.current.observe(el);
	},[isLoading, hasMore, refetch]);


    return{
        lastElementRef
    }
}