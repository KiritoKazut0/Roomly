import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Wifi, Zap, Droplets, Shield, MessageCircle } from 'lucide-react';
import type { RoomDto } from '../../types/dtos/rooms/Room.dto';
import type { ReviewDto } from '../../types/dtos/reviews/Reviews.dto';
import NavDetailsRoom from '../../components/layout/Nav/DetailsNavRoom';
import CarruselImages from '../../components/ui/carrusel/CarruselImages';
import ReviewForm from '../Forms/ReviewForm';
import type { JSX } from '@emotion/react/jsx-runtime';
import ReviewsList from '../../components/ui/reviews/Reviews';
import rentsMocks from "../../mocks/homes.json"; 

interface RoomDetailsPageProps {}

export const RoomDetailsPage: React.FC<RoomDetailsPageProps> = () => {
    
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    
    const [room, setRoom] = useState<RoomDto | null>(null);
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({ comment: '', rating: 0 });
    const [userComments, setUserComments] = useState<ReviewDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carga de datos
        const loadRoomData = async () => {
            try {
                // Buscar el cuarto por ID en los mocks
                const foundRoom = rentsMocks.find(r => r.id === roomId);
                
                if (foundRoom) {
                    setRoom(foundRoom);
                    // Aquí podrías cargar las reseñas desde una API
                    // const reviewsData = await fetchReviews(roomId);
                    const reviewsData: ReviewDto[] = []; // Por ahora vacío
                    setReviews(reviewsData);
                    setUserComments(reviewsData);
                } else {
                    // Redirigir si no se encuentra el cuarto
                    navigate('/residents', { replace: true });
                }
            } catch (error) {
                console.error('Error loading room data:', error);
                navigate('/residents', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        if (roomId) {
            loadRoomData();
        } else {
            navigate('/residents', { replace: true });
        }
    }, [roomId, navigate]);

    const handleBack = () => {
        navigate('/residents');
    };

    // Función para obtener íconos de servicios
    const getServiceIcon = (service: string) => {
        switch (service.toLowerCase()) {
            case 'agua': return <Droplets className="w-4 h-4 text-blue-500" />;
            case 'luz': return <Zap className="w-4 h-4 text-yellow-500" />;
            case 'internet': return <Wifi className="w-4 h-4 text-green-500" />;
            default: return <Shield className="w-4 h-4 text-gray-500" />;
        }
    };

    // Función para renderizar estrellas
    const renderStars = (rating: number): JSX.Element[] => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-3 h-3 ${
                    index < rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                }`}
            />
        ));
    };

    // Manejar envío de reseña
    const handleSubmitReview = async () => {
        if (newReview.comment.trim() && newReview.rating > 0) {
            const review: ReviewDto = {
                user: {
                    id: Date.now().toString(),
                    name: "Usuario Actual",
                },
                comment: newReview.comment,
                qualification: newReview.rating
            };
            
            setUserComments([review, ...userComments]);
            setNewReview({ comment: '', rating: 0 });
            setShowReviewForm(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando detalles del cuarto...</p>
                </div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Cuarto no encontrado</p>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Volver a la lista
                    </button>
                </div>
            </div>
        );
    }

    // Calcular promedio de calificaciones
    const averageRating = userComments.length > 0 
        ? userComments.reduce((sum, comment) => sum + comment.qualification, 0) / userComments.length 
        : 0;

    // Imágenes por defecto si no hay fotos
    const images = room.photo_album.length > 0 
        ? room.photo_album 
        : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop'];

    return (
        <div className="min-h-screen bg-gray-50">
            <NavDetailsRoom ciudad={room.ciudad} onBack={handleBack} />

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
                <div className="space-y-6">
                    
                    {/* Image Gallery */}
                    <CarruselImages images={images} idRoom={room.id}/>

                    {/* Room Details */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        
                        {/* Rating and Reviews Header */}
                        {userComments.length > 0 && (
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex items-center space-x-1">
                                    {renderStars(Math.round(averageRating))}
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                    {averageRating.toFixed(1)}
                                </span>
                                <span className="text-sm text-gray-500">
                                    ({userComments.length} reseñas)
                                </span>
                            </div>
                        )}

                        {/* Title and Price */}
                        <div className="mb-4">
                            <h1 className="text-2xl font-light text-gray-900 mb-2">
                                Cuarto amueblado en {room.ciudad}
                            </h1>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-3xl font-light text-gray-900">
                                    ${room.precio_mensual.toLocaleString()}
                                </span>
                                <span className="text-base text-gray-500">/mes</span>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mb-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                room.status === 'Disponible' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {room.status}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="text-base font-medium text-gray-900 mb-3">Descripción</h2>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {room.descripcion}
                            </p>
                        </div>

                        {/* Location */}
                        <div className="mb-6">
                            <h2 className="text-base font-medium text-gray-900 mb-3">Ubicación</h2>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900 mb-1 text-sm">
                                        {room.calle} #{room.numero_casa}, {room.colonia}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {room.ciudad}, {room.estado} - CP: {room.cp}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="mb-6">
                            <h2 className="text-base font-medium text-gray-900 mb-3">Servicios</h2>
                            
                            <div className="mb-4">
                                <h3 className="text-xs font-medium text-gray-700 mb-2">Incluidos</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {room.servicios.map((servicio, index) => (
                                        <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                                            {getServiceIcon(servicio)}
                                            <span className="text-gray-700 font-medium text-sm">{servicio}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {room.otros_servicios.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-medium text-gray-700 mb-2">Adicionales</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {room.otros_servicios.map((servicio, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                {servicio}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                Reseñas ({userComments.length})
                            </h2>
                            <button
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
                            >
                                <MessageCircle className="w-3 h-3" />
                                <span>{showReviewForm ? 'Cancelar' : 'Escribir reseña'}</span>
                            </button>
                        </div>

                        <ReviewForm
                            handleSubmitReview={handleSubmitReview}
                            setShowReviewForm={setShowReviewForm}
                            showReviewForm={showReviewForm}
                        />

                        <ReviewsList 
                            userComments={userComments}
                            renderStars={renderStars}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};