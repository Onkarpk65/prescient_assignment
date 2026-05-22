import { useEffect, useState } from "react";
import axios from "axios";

const useGetAllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/shoppingcart/api/v1/items`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setItems(response.data.data || []);
    } catch (error) {
      console.log("Error fetching items:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    fetchItems,
  };
};

export default useGetAllItems;
