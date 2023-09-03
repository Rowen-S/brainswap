import React, { useState, useEffect } from 'react'

type NumberAnimationProps = {
  endValue: number
  duration: number
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({ endValue, duration }: NumberAnimationProps) => {
  const [currentValue, setCurrentValue] = useState<string>('0') // 使用字符串类型以保留4位小数

  useEffect(() => {
    let startTimestamp: number | undefined
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min(1, (timestamp - startTimestamp) / duration)
      setCurrentValue((progress * endValue).toFixed(4)) // 使用toFixed来保留4位小数

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)

    return () => {
      // 清理动画帧请求
      cancelAnimationFrame(step)
    }
  }, [endValue, duration])

  return <div>{currentValue}</div>
}

export default NumberAnimation
