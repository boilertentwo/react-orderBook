import { userDatabase } from "../../appwrite.config";
import { useState, useEffect } from "react";
import { Query } from "appwrite";
import { useAuth } from "../../utils/authContext";

export function Payment() {
  const { userId } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setData([])  
      try {
        const response = await userDatabase.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASEID,
          import.meta.env.VITE_APPWRITE_ORDER_COLLECT,
          [
            Query.equal('userID',[`${userId}`]),
        
          ]
        );
        setData(response.documents);
      } catch (error) {
        setError('Error fetching user orders');
        console.log('Error fetching user orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>User Orders</h2>
      {data.length === 0 ? (
        <p>No orders found</p>
      ) : (
          <div>
               
          </div>
  )}
    </div>
  );
}
