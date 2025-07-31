import { useState } from 'react';
import { Upload, MapPin, DollarSign, Home, Wifi, Bath, ChefHat, Plus, X, AlertCircle } from 'lucide-react';
import useField from '../../hooks/useFields';
import { CreateRoom } from '../../service/rooms/CreateRoomService';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import type { RoomService } from '../../types/dtos/rooms/CreateRoom.dto';
import { uploadRoomImages } from '../../service/upload/sendImages';

const RentalForm = () => {

  const { userData } = useAuthGuard();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherServices, setOtherServices] = useState<string[]>(['']);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [propertyTypeValue, setPropertyTypeValue] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Campos del formulario
  const titlePublication = useField({ type: 'title' });
  const location = useField({ type: "location" });
  const price = useField({ type: "price" });
  const calle = useField({ type: "location" });
  const extNumber = useField({ type: "extNumber" });
  const postalCode = useField({ type: "postalCode" });
  const city = useField({ type: "location" });
  const state = useField({ type: "location" });

  const roomServices = [
    { id: 'Amueblado', label: 'Amueblado', icon: Home },
    { id: 'WiFi', label: 'WiFi', icon: Wifi },
    { id: 'Baño', label: 'Baño', icon: Bath },
    { id: 'Cocina', label: 'Cocina', icon: ChefHat }
  ];

  const validateAdditionalFields = () => {
    const newErrors: Record<string, string> = {};

    if (!propertyTypeValue) {
      newErrors.propertyType = 'Selecciona el tipo de inmueble';
    }

    // Validar descripción
    if (!description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (description.trim().length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres';
    }

    if (uploadedImages.length === 0) {
      newErrors.images = 'Debes subir al menos una imagen';
    } else if (uploadedImages.length > 6) {
      newErrors.images = 'Máximo 6 imágenes permitidas';
    }

    const validOtherServices = otherServices.filter(service => service.trim() !== '');
    if (selectedServices.length === 0 && validOtherServices.length === 0) {
      newErrors.services = 'Selecciona al menos un servicio o característica';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasFieldErrors = () => {
    return !!(
      titlePublication.messageError ||
      location.messageError ||
      price.messageError ||
      calle.messageError ||
      extNumber.messageError ||
      postalCode.messageError ||
      city.messageError ||
      state.messageError
    );
  };

  const handlePropertyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyTypeValue(event.target.value);
    if (errors.propertyType) {
      setErrors(prev => ({ ...prev, propertyType: '' }));
    }
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: '' }));
    }
  };

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices(prev => [...prev, serviceId]);
    } else {
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
    }

    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const handleOtherServiceChange = (index: number, value: string) => {
    const newOtherServices = [...otherServices];
    newOtherServices[index] = value;
    setOtherServices(newOtherServices);
    

    if (errors.services && value.trim()) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const addOtherService = () => {
    setOtherServices([...otherServices, '']);
  };

  const removeOtherService = (index: number) => {
    setOtherServices(otherServices.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length + uploadedImages.length > 6) {
      setErrors(prev => ({ ...prev, images: 'Máximo 6 imágenes permitidas' }));
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImages(prev => [...prev, e.target!.result as string]);
          if (errors.images) {
            setErrors(prev => ({ ...prev, images: '' }));
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlerNewRoom = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateAdditionalFields() || hasFieldErrors()) {
      console.log('Errores en el formulario');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (!userData) {
        setErrors({ general: 'Usuario no autenticado' });
        return;
      }

      const { id } = userData;
      
      // Filtrar servicios adicionales vacíos
      const validOtherServices = otherServices.filter(service => service.trim() !== '');

        // usar el servicio de imagenes y usar las urls para poder crear el cuarto 
        // pasar las files 
    //   const imagesSenders = await uploadRoomImages()
      const result = await CreateRoom({
        id_user: id,
        city: city.value.trim(),
        description: description.trim(),
        images: uploadedImages,
        location_number: Number(extNumber.value),
        location_postal_code: postalCode.value.trim(),
        location_street: calle.value.trim(),
        price_monthly: Number(price.value),
        state: state.value.trim(),
        zone: location.value.trim(),
        other_services: validOtherServices,
        status: "En revision",
        services: selectedServices.map(service => service as RoomService)
      });

      // Éxito - redirigir o mostrar mensaje
      console.log('Publicación creada exitosamente:', result);
      
      // Limpiar formulario o redirigir
      // window.location.href = '/mis-publicaciones' o usar router
      
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      setErrors({ 
        general: error instanceof Error ? error.message : 'Error al crear la publicación. Inténtalo nuevamente.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center space-x-1 text-red-500 text-xs mt-1">
      <AlertCircle className="h-3 w-3" />
      <span>{message}</span>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="bg-white p-15">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Publica tu espacio</h1>
          <p className="text-gray-600">Completa la información y llega a miles de interesados</p>
        </div>

        {/* Error general */}
        {errors.general && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <ErrorMessage message={errors.general} />
          </div>
        )}

        <form onSubmit={handlerNewRoom} className="max-w-4xl mx-auto space-y-8">
          {/* Título y Tipo de inmueble */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Título del anuncio *
              </label>
              <input
                type="text"
                onChange={titlePublication.onChange}
                onBlur={titlePublication.onBlur}
                value={titlePublication.value}
                placeholder="Ej: Habitación amplia en zona céntrica"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  titlePublication.messageError ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {titlePublication.messageError && <ErrorMessage message={titlePublication.messageError} />}
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Tipo de inmueble *
              </label>
              <select 
                onChange={handlePropertyTypeChange}
                value={propertyTypeValue}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white ${
                  errors.propertyType ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Selecciona el tipo</option>
                <option value="Habitación">Habitación</option>
                <option value="Departamento">Departamento</option>
                <option value="Casa">Casa</option>
                <option value="Estudio">Estudio</option>
              </select>
              {errors.propertyType && <ErrorMessage message={errors.propertyType} />}
            </div>
          </div>

          {/* Ubicación y Precio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Ubicación *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ciudad, colonia o dirección"
                  onBlur={location.onBlur}
                  onChange={location.onChange}
                  value={location.value}
                  className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                    location.messageError ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {location.messageError && <ErrorMessage message={location.messageError} />}
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Precio mensual *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="5000"
                  onBlur={price.onBlur}
                  onChange={price.onChange}
                  value={price.value}
                  min="1"
                  className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                    price.messageError ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {price.messageError && <ErrorMessage message={price.messageError} />}
            </div>
          </div>

          {/* Dirección detallada */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Calle *
              </label>
              <input
                type="text"
                placeholder="Nombre de la calle"
                onChange={calle.onChange}
                onBlur={calle.onBlur}
                value={calle.value}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  calle.messageError ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {calle.messageError && <ErrorMessage message={calle.messageError} />}
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Número *
              </label>
              <input
                type="number"
                placeholder="123"
                onBlur={extNumber.onBlur}
                onChange={extNumber.onChange}
                value={extNumber.value}
                min="1"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  extNumber.messageError ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {extNumber.messageError && <ErrorMessage message={extNumber.messageError} />}
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Código Postal *
              </label>
              <input
                type="text"
                placeholder="29000"
                onBlur={postalCode.onBlur}
                onChange={postalCode.onChange}
                value={postalCode.value}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  postalCode.messageError ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {postalCode.messageError && <ErrorMessage message={postalCode.messageError} />}
            </div>
          </div>

          {/* Ciudad y Estado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad *
              </label>
              <input
                type="text"
                placeholder="Tuxtla Gutiérrez"
                onBlur={city.onBlur}
                onChange={city.onChange}
                value={city.value}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  city.messageError ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {city.messageError && <ErrorMessage message={city.messageError} />}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <input
                type="text"
                placeholder="Chiapas"
                onChange={state.onChange}
                onBlur={state.onBlur}
                value={state.value}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  state.messageError ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {state.messageError && <ErrorMessage message={state.messageError} />}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Descripción breve *
            </label>
            <textarea
              onChange={handleTextareaChange}
              value={description}
              rows={4}
              placeholder="Describe tu espacio, ubicación y características principales... (mínimo 20 caracteres)"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              <div>
                {errors.description && <ErrorMessage message={errors.description} />}
              </div>
              <span className="text-xs text-gray-500">
                {description.length}/500 caracteres
              </span>
            </div>
          </div>

          {/* Fotos del espacio */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Fotos del espacio *
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition duration-200 ${
              errors.images ? 'border-red-300' : 'border-gray-300'
            }`}>
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
              <p className="text-gray-600 mb-2 text-sm">Arrastra fotos aquí o</p>
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="text-blue-500 hover:text-blue-700 font-medium underline text-sm">
                  haz clic para seleccionar
                </span>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Máximo 6 imágenes</p>
            </div>
            {errors.images && <ErrorMessage message={errors.images} />}
            
            {/* Preview de imágenes subidas */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Características/Servicios */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-4">
              Características *
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {roomServices.map((service) => {
                const Icon = service.icon;
                const isChecked = selectedServices.includes(service.id);
                return (
                  <div
                    key={service.id}
                    className={`flex items-center space-x-2 p-2 border rounded-lg hover:border-blue-400 cursor-pointer transition duration-200 ${
                      isChecked ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onClick={() => handleServiceChange(service.id, !isChecked)}
                  >
                    <input
                      type="checkbox"
                      id={service.id}
                      checked={isChecked}
                      onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                      className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Icon className="h-4 w-4 text-gray-600" />
                    <label htmlFor={service.id} className="text-xs text-gray-700 cursor-pointer">
                      {service.label}
                    </label>
                  </div>
                );
              })}
            </div>
            {errors.services && <ErrorMessage message={errors.services} />}
          </div>

          {/* Otros servicios */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Otros servicios (opcional)
            </label>
            {otherServices.map((service, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleOtherServiceChange(index, e.target.value)}
                  placeholder="Describe otro servicio..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                {otherServices.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOtherService(index)}
                    className="p-1 text-red-500 hover:text-red-700 transition duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOtherService}
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition duration-200"
            >
              <Plus className="h-3 w-3" />
              <span className="text-xs">Agregar otro servicio</span>
            </button>
          </div>

          {/* Botón de envío */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg focus:ring-4 focus:ring-blue-200 transition duration-200 font-medium text-base ${
                isSubmitting 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar mi espacio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalForm;