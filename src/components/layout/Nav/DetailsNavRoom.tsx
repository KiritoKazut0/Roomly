import { ArrowLeft } from 'lucide-react';

interface DetailsNavRoomProps{
     onBack: () => void;
     ciudad: string

}

export default function NavDetailsRoom({ciudad, onBack}: DetailsNavRoomProps) {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <h1 className="text-base font-medium text-gray-900">
                            Cuarto en {ciudad}
                        </h1>
                    </div>
                </div>
            </div>
        </header>

    );
}