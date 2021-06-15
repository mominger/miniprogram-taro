import { useEffect, useCallback, useRef } from 'react'

/**
 * 防抖
 * @param fn 执行函数
 * @param delay 延迟时间
 * @param dep  依赖字段
 * @returns 
 */
export default function useDebounce(fn, delay = 1000, dep = []) {
	const { current } = useRef({ fn, timer: null })

	useEffect(
		function () {
			current.fn = fn
		},
		[fn]
	)
	return useCallback(function f(...args) {
		if (current.timer) {
			clearTimeout(current.timer)
		}
		current.timer = setTimeout(() => {
			current.fn.call(this, ...args)
		}, delay)
	}, dep)
}
