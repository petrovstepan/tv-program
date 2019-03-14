import React from 'react'

// изначально идея была в том, чтобы котролировать прогресс с помощью состояния и интервалов в 2-5 сек
// но мне показалось, что это недостаточно плавно и сильно грузит страницу
// через анимацию все вроде получше, но иногда тоже немного грузить

const ProgressBar = ({ delay, duration, onAnimationEnd }) => {
  return (
    <div
      style={{
        animationName: 'progress-bar',
        animationDuration: `${duration}ms`,
        animationDelay: `-${delay}ms`,
      }}
      className="program__progress-bar"
      onAnimationEnd={onAnimationEnd}
    >
      {' '}
    </div>
  )
}

export default ProgressBar
