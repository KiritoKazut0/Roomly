import type { JSX } from "@emotion/react/jsx-runtime";
import type { ReviewDto } from "../../../types/dtos/reviews/Reviews.dto";
import {  MessageCircle } from 'lucide-react';


interface CommentsUserProps {
    userComments: ReviewDto[]
     renderStars: (rating: number) => JSX.Element[]
}

export default function ReviewsList({userComments, renderStars}: CommentsUserProps) {
    return (
        <>
            {/* Reviews List */}
            {userComments.length > 0 ? (
                <div className="space-y-4">
                    {userComments.map((comment, index) => (
                        <div key={index} className="flex space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                            <img
                                src={comment.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}&background=6366f1&color=fff`}
                                alt={comment.user.name}
                                className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-gray-900 text-sm">
                                        {comment.user.name}
                                    </span>
                                    <div className="flex">
                                        {renderStars(comment.qualification)}
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {comment.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                        No hay reseñas aún. ¡Sé el primero en compartir tu experiencia!
                    </p>
                </div>
            )}
        </>
    );
}