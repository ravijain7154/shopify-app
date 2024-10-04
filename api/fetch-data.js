export default async function handler(req, res) {
    try {
      console.log("Function started");
      
      // Example API call (replace with actual logic)
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      
      console.log("Function completed successfully", data);
      
      res.status(200).json(data);
    } catch (error) {
      console.error("Function failed", error);
      
      res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
  }
  