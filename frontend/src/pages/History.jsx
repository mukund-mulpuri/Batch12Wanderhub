import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Users, Star, Clock, TrendingUp } from 'lucide-react';

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalSpent: 0,
    placesVisited: 0,
    avgRating: 0
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/auth');
        return;
      }

      const response = await fetch('http://localhost:3001/api/trip-bookings?status=completed', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.bookings) {
          setHistory(data.data.bookings);
          calculateStats(data.data.bookings);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching history:', error);
      setLoading(false);
    }
  };

  const calculateStats = (trips) => {
    const totalTrips = trips.length;
  const totalSpent = trips.reduce((sum, trip) => sum + (trip.paymentDetails?.totalAmount || 0), 0);
  const placesVisited = new Set(trips.map(trip => trip.tripDetails.destination)).size;
    const ratingsSum = trips.reduce((sum, trip) => sum + (trip.feedback?.rating || 0), 0);
    const ratedTrips = trips.filter(trip => trip.feedback?.rating).length;
    const avgRating = ratedTrips > 0 ? ratingsSum / ratedTrips : 0;

    setStats({
      totalTrips,
      totalSpent,
      placesVisited,
      avgRating
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your travel history...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Travel History</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Trips</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalTrips}</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-green-600">₹{stats.totalSpent.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Places Visited</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.placesVisited}</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.avgRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Items */}
        <div className="space-y-4">
          {history.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Travel History Yet</h3>
                <p className="text-gray-600">Start planning your first trip to create memories!</p>
              </CardContent>
            </Card>
          ) : (
            history.map((trip) => (
              <Card key={trip._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        {trip.tripDetails.destination}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(trip.tripDetails.startDate)} - {formatDate(trip.tripDetails.endDate)}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{calculateDuration(trip.tripDetails.startDate, trip.tripDetails.endDate)} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{trip.tripDetails.travelers} travelers</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-green-600">
                      ₹{(trip.paymentDetails?.totalAmount || 0).toLocaleString()}
                    </div>
                  </div>
                  
                  {trip.feedback && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < trip.feedback?.rating 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{trip.feedback?.rating || 0}/5</span>
                      </div>
                      <p className="text-sm text-gray-600 italic">"{trip.feedback?.comment || ''}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;