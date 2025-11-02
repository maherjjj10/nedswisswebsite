'use client';

interface PlaceholderImageProps {
  title: string;
  className?: string;
}

export const PlaceholderImage = ({ title, className = '' }: PlaceholderImageProps) => {
  const getInitials = (text: string) => {
    return text
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const gradients = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-blue-600',
    'from-purple-500 to-pink-600',
    'from-yellow-500 to-red-600',
    'from-indigo-500 to-purple-600',
    'from-pink-500 to-rose-600',
  ];

  // Simple hash function to consistently select gradient
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const gradientIndex = hashCode(title) % gradients.length;
  const selectedGradient = gradients[gradientIndex];

  return (
    <div className={`flex items-center justify-center bg-gradient-to-br ${selectedGradient} ${className}`}>
      <div className="text-center text-white">
        <div className="text-4xl md:text-5xl font-bold mb-2">
          {getInitials(title)}
        </div>
        <div className="text-sm opacity-80 max-w-[80%] mx-auto line-clamp-2">
          {title}
        </div>
      </div>
    </div>
  );
}; 