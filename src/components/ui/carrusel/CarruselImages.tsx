import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarruselImageProps {
    images: string[]
    idRoom: string
}

export default function CarruselImages(
    { images, idRoom }: CarruselImageProps
) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    return (
        <div className="relative bg-gray-900 rounded-xl overflow-hidden">
            <div className="aspect-[16/9] relative">
                <img
                    src={images[currentImageIndex]}
                    alt={`Cuarto ${idRoom} - Imagen ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-white" />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-white" />
                        </button>

                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                            {currentImageIndex + 1} / {images.length}
                        </div>


                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}