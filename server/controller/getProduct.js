export const getProduct = async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
