import { useState } from "react";
import { Star } from 'lucide-react';

interface ReviewFormProps {
    showReviewForm: boolean;
    setShowReviewForm: (value: boolean) => void;
    handleSubmitReview: (comment: string, rating: number) => void;
}

export default function ReviewForm(
    { showReviewForm, handleSubmitReview, setShowReviewForm }: ReviewFormProps
) {

    const [newReview, setNewReview] = useState({ comment: '', rating: 0 });

    const handleStarClick = (rating: number) => {
        setNewReview(prev => ({ ...prev, rating }));
    };

    const onSubmit = () => {
        handleSubmitReview(newReview.comment, newReview.rating);
        setNewReview({ comment: '', rating: 0 });
        setShowReviewForm(false);
    };


    return (
        <>
            {showReviewForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            Tu calificación
                        </label>
                        <div className="flex space-x-1">
                            {Array.from({ length: 5 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleStarClick(index + 1)}
                                    className="p-0.5 hover:scale-110 transition-transform"
                                >
                                    <Star
                                        className={`w-5 h-5 ${index < newReview.rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300 hover:text-yellow-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            Tu comentario
                        </label>
                        <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                            placeholder="Comparte tu experiencia con este cuarto..."
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                            rows={3}
                        />
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={onSubmit}
                            disabled={!newReview.comment.trim() || newReview.rating === 0}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                        >
                            Publicar reseña
                        </button>
                        <button
                            onClick={() => setShowReviewForm(false)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}