// 位运算
// const enum ShapeFlags {
//   a = 1,
//   b = 1 << 1,
//   c = 1 << 2,
//   d = 1 << 3,
//   e = 1 << 9,
//   f = ShapeFlags.a | ShapeFlags.c | ShapeFlags.e
// }
// console.log(ShapeFlags.a)
// console.log(ShapeFlags.b)
// console.log(ShapeFlags.c)
// console.log(ShapeFlags.d)
// console.log(ShapeFlags.e)
// console.log(ShapeFlags.f)
// console.log(ShapeFlags.f & ShapeFlags.d)

// 两数之和
function twoSum(nums: number[], target: number): number[] {
  const numMap = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    const n = target - nums[i]
    if (numMap.has(n)) return [numMap.get(n), i]
    numMap.set(nums[i], i)
  }
  return []
}
twoSum([2, 7, 11, 15], 9)

// 三数之和
function threeSum(nums: number[]): number[][] {
  // nums.sort((a, b) => a - b)
  // const resultMap = new Map<string, number[]>()
  // for (let i = 0; i < nums.length; i++) {
  //   const value = nums[i]
  //   const numMap = new Map<number, number>()
  //   for (let k = 0; k < nums.length; k++) {
  //     if (i === k) break
  //     const n = -value - nums[k]
  //     const resultKey = `${value},${n},${nums[k]}`
  //     if (numMap.has(n) && !resultMap.has(resultKey)) resultMap.set(resultKey, [value, n, nums[k]])
  //     else numMap.set(nums[k], i)
  //   }
  // }
  // return Array.from(resultMap.values())

  const result = []
  // n*lgn
  nums.sort((a, b) => a - b)
  for (let index = 0; index < nums.length; index++) {
    // 规避相同相同值，防止重复数组
    if (nums[index] === nums[index - 1]) continue
    // 以 index 为基准，形成左右指针遍历查询
    let leftIndex = index + 1
    let rightIndex = nums.length - 1
    while (leftIndex < rightIndex) {
      if (rightIndex === index) {
        // 如果index 等于 右指针下标，则右指针左移
        rightIndex--
      } else if (nums[index] + nums[leftIndex] + nums[rightIndex] === 0) {
        // 命中条件
        result.push([nums[index], nums[leftIndex], nums[rightIndex]])
        while (nums[leftIndex] === nums[leftIndex + 1]) {
          leftIndex++
        }
        leftIndex++
        while (nums[rightIndex] === nums[rightIndex - 1]) {
          rightIndex--
        }
        rightIndex--
      } else if (nums[index] + nums[leftIndex] + nums[rightIndex] < 0) {
        // 三数之和变小，则左指针右移
        leftIndex++
      } else {
        // 三数之和变大，则右指针左移
        rightIndex--
      }
    }
  }
  return result
}
// threeSum([-1, 0, 1, 2, -1])
threeSum([-1, 0, 1, 2, -1, -1, -1, -4])

// leftpad函数
function leftpad(str: string, length: number, ch: string) {
  const len = length - str.length + 1
  return len > 0 ? Array(len).join(ch) + str : str
}
// 二分思路优化 leftpad
function leftpadv2(str: string, length: number, ch: string) {
  let len = length - str.length
  let total = ''
  const condition = true

  while (condition) {
    // if (len % 2 === 1)
    if (len & 1) total += ch
    if (len === 1) return total + str
    ch += ch
    // len = parseInt(String(len / 2))
    len = len >> 1
  }
}
// console.info('leftpad start')
// console.time('leftpad')
// for (let i = 0; i < 1000; i++) {
leftpad('hello', 100000, '0')
// }
// console.timeEnd('leftpad')
// console.info('leftpadv2 start')
// console.time('leftpadv2')
// for (let i = 0; i < 1000; i++) {
leftpadv2('hello', 100000, '0')
// }
// console.timeEnd('leftpadv2')

// 斐波那契数
function fib(n: number): number {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
}
console.log(fib(4))
function fibv2(n: number): number {
  const cache = []
  const helper: (any, number) => number = (result, m) => {
    if (m <= 1) return m
    if (result[m]) return result[m]
    result[m] = helper(result, m - 1) + helper(result, m - 2)
    return result[m]
  }
  return helper(cache, n)
}
console.log(fibv2(8))
