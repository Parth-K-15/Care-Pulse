import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Phone, Mail, Users, Clock } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/doctor-profile/${doctor.id}`);
  };

  return (
    <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors h-full">
      <CardContent className="p-6">
        {/* Doctor Header */}
        <div className="text-center mb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-gray-700">
            <AvatarImage src={doctor.avatar} alt={doctor.name} />
            <AvatarFallback className="bg-gray-800 text-white text-lg">
              👨‍⚕️
            </AvatarFallback>
          </Avatar>
          
          <h3 className="text-lg font-bold text-white mb-1">{doctor.name}</h3>
          <p className="text-gray-400 mb-3">{doctor.specialty}</p>
          
          <Badge className="bg-green-900 text-green-300 border-green-700 mb-4">
            ✅ {doctor.status}
          </Badge>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">{doctor.rating}</span>
            <span className="text-gray-400">• {doctor.reviews} reviews</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-xs">📧 Email</p>
              <p className="text-white text-sm truncate">{doctor.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-gray-400 text-xs">📞 Phone</p>
              <p className="text-white text-sm">{doctor.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-xs">📍 Address</p>
              <p className="text-white text-sm line-clamp-2">{doctor.address}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-gray-400 text-xs">👥 Patients</p>
                <p className="text-white text-sm">{doctor.patients} active</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-gray-400 text-xs">⏱️ Experience</p>
                <p className="text-white text-sm">{doctor.experience} years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleViewProfile}
          className="w-full bg-black hover:bg-gray-900 border border-gray-700 text-white transition-colors"
        >
          👁️ View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;