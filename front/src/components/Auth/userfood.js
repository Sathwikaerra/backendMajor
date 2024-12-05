import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/reducers";

const FoodOrderingPage = () => {
  const dispatch = useDispatch();
  const CartCount = useSelector((state) => state.cart.CartCount);

  // State for cart items
  const [cart, setCart] = useState([]);
  
  // State to track selected category
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [show,setShow]=useState(false);

  // Menu items with categories
  const menuItems = [
    {
      id: 1,
      category: "Burgers",
      name: "Cheeseburger",
      price: 5.99,
      image: "https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?semt=ais_hybrid"
    },
    {
      id: 2,
      category: "Burgers",
      name: "Veggie Burger",
      price: 4.99,
      image: "https://static.vecteezy.com/system/resources/previews/023/809/530/non_2x/a-flying-burger-with-all-the-layers-ai-generative-free-photo.jpg"
    },
    {
      id: 3,
      category: "Pizza",
      name: "Margherita Pizza",
      price: 8.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaxVhAJD85NE9WNvuxfmutOJapD3EqHAuenQ&s"
    },
    {
      id: 4,
      category: "Pizza",
      name: "Pepperoni Pizza",
      price: 9.49,
      image: "https://cdn.pixabay.com/photo/2020/04/29/03/30/pizza-5107039_640.jpg"
    },
    {
      id: 5,
      category: "Pasta",
      name: "Spaghetti Carbonara",
      price: 7.49,
      image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?cs=srgb&dl=pexels-enginakyurt-1437267.jpg&fm=jpg"
    },
    {
      id: 6,
      category: "Pasta",
      name: "Penne Alfredo",
      price: 6.99,
      image: "https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?cs=srgb&dl=pexels-enginakyurt-1487511.jpg&fm=jpg"
    },
    {
      id: 7,
      category: "Salads",
      name: "Caesar Salad",
      price: 5.49,
      image: "https://t3.ftcdn.net/jpg/02/93/22/02/360_F_293220207_aSKIua6mTAymZDbIJOSOApeJ7vNoD6Zd.jpg"
    },
    {
      id: 8,
      category: "Salads",
      name: "Greek Salad",
      price: 6.49,
      image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/08/Greek-Salad-main.jpg"
    },
    {
      id: 9,
      category: "Fries",
      name: "French Fries",
      price: 2.99,
      image: "https://static.vecteezy.com/system/resources/thumbnails/027/536/411/small/delicious-french-fries-on-a-white-background-photo.jpg"
    },
    {
      id: 10,
      category: "Fries",
      name: "Sweet Potato Fries",
      price: 3.99,
      image: "https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?cs=srgb&dl=pexels-valeriya-1893555.jpg&fm=jpg"
    },
    {
      id: 11,
      category: "Cool Drinks",
      name: "Iced Tea",
      price: 2.49,
      image: "https://img.freepik.com/premium-photo/glass-iced-tea-with-lemon-slice-white-background_787273-1964.jpg"
    },
    {
      id: 12,
      category: "Cool Drinks",
      name: "Lemonade",
      price: 2.99,
      image: "https://img.freepik.com/free-photo/refreshing-mojito-cocktails-with-lime-slices-generative-ai_188544-12369.jpg"
    },
    {
      id: 13,
      category: "Cool Drinks",
      name: "Soda",
      price: 1.99,
      image: "https://img.freepik.com/free-photo/colorful-soda-drinks-macro-shot_53876-32239.jpg"
    },
    {
      id: 14,
      category: "Desserts",
      name: "Chocolate Brownie",
      price: 3.99,
      image: "https://cdn.pixabay.com/photo/2024/01/19/13/43/chocolate-8519117_640.png"
    },
    {
      id: 15,
      category: "Desserts",
      name: "StrawBerry Ice Cream",
      price: 8.99,
      image: "https://media.gettyimages.com/id/157472912/photo/ice-cream-composition-on-a-bowl.jpg?s=612x612&w=gi&k=20&c=AniWX1OhaarUxCkgjUoKiA3bKVllK0upCylW6Z0PCMQ="
    },
    {
      id: 16,
      category: "Desserts",
      name: "Choclate Ice Cream",
      price: 8.99,
      image: "https://img.lovepik.com/photo/48014/8007.jpg_wh860.jpg"
    },
    {
      id: 17,
      category: "Desserts",
      name: "Vanilla Ice Cream",
      price: 2.49,
      image: "https://t3.ftcdn.net/jpg/05/64/02/34/360_F_564023464_RaZb95D8yFPt2DnxbsYLQaQQ5BSrUImO.jpg"
    },
    {
      id: 18,
      category: "Sandwiches",
      name: "Grilled Cheese Sandwich",
      price: 4.49,
      image: "https://c4.wallpaperflare.com/wallpaper/435/472/996/sandwich-4k-for-desktop-wallpaper-preview.jpg"
    },
    {
      id: 19,
      category: "Sandwiches",
      name: "Chicken Club Sandwich",
      price: 6.49,
      image: "https://thumbs.dreamstime.com/b/sandwich-bacon-18777153.jpg"
    },
    {
      id: 20,
      category: "Wraps",
      name: "Chicken Caesar Wrap",
      price: 5.99,
      image: "https://www.shutterstock.com/image-photo/closeup-mouthwatering-chicken-wrap-filled-600nw-2488692245.jpg"
    },
    {
      id: 21,
      category: "Wraps",
      name: "Falafel Wrap",
      price: 4.99,
      image: "https://static.vecteezy.com/system/resources/previews/022/906/630/non_2x/fresh-grilled-chicken-wrap-roll-with-flying-ingradients-and-spices-hot-ready-to-serve-and-eat-with-copyspace-area-generate-ai-free-photo.jpg"
    },
    {
      id: 22,
      category: "Sushi",
      name: "Vegetable Sushi Roll",
      price: 8.99,
      image: "https://img.lovepik.com/photo/50127/2796.jpg_wh860.jpg"
    },
    {
      id: 23,
      category: "PopCorn",
      name: "SpicyCorn",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1657046935595-40897d3c1316?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvcGNvcm58ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 24,
      category: "PopCorn",
      name: "SaltCorn",
      price: 8.99,
      image: "https://img.freepik.com/premium-photo/pop-corn-hd-8k-wallpaper-stock-photographic-image_890746-35602.jpg"
    },
    {
      id: 25,
      category: "PopCorn",
      name: "SweetCorn",
      price: 8.99,
      image: "https://img.freepik.com/premium-photo/popcorn-kernels-hd-8k-wallpaper-stock-photographic-image_890746-33963.jpg"
    },
    
  ];
  

  // Extract unique categories
  const categories = [...new Set(menuItems.map((item) => item.category))];

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("UserCart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("UserCart", JSON.stringify(cart));
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    dispatch(cartActions.IncreaseCount());
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    dispatch(cartActions.DecreaseCount());
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    dispatch(cartActions.SetNull());
    setCart([]);
    localStorage.removeItem("UserCart");
  };

  // Calculate total cost
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mt-[60px] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Food Ordering by Category</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Category Selection */}
        <div>
          <h2 className="text-2xl  flex justify-center items-center font-semibold mb-3">Categories</h2>
          <ul className=" flex gap-4 flex-1 justify-center items-center  flex-wrap space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`w-full p-2 rounded text-left ${
                  show==true &&  selectedCategory === category
                      ? "bg-blue-950 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                  onClick={() => {
                    setShow(true)
                    setSelectedCategory(category)}}
                >
                  {category}
                </button>
                
              </li>
            ))}
          </ul>

          {/* Items in Selected Category */}
          {show && selectedCategory && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3">{selectedCategory} Menu</h3>
              <ul className="space-y-4">
                {menuItems
                  .filter((item) => item.category === selectedCategory)
                  .map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center bg-gray-100 p-4 rounded shadow"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 ml-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center bg-gray-100 p-4 rounded shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      -
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 font-bold text-lg">Total: ${calculateTotal()}</div>
          <button
            onClick={clearCart}
            className="bg-red-500 active:bg-red-700 rounded-lg p-3 text-white mt-4"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodOrderingPage;



// import React, { useState, useEffect } from "react";
// import { useDispatch,useSelector } from 'react-redux';
// import { cartActions } from "../../store/reducers";


// const FoodOrderingPage = () => {
//   const dispatch=useDispatch()

//   const CartCount=useSelector((state)=>state.cart.CartCount);
//   // console.log(CartCount)
  

//   // State for cart items
//   const [cart, setCart] = useState([]);

//   // Menu items
//   const menuItems = [
//     {
//       id: 1,
//       name: "Burger",
//       price: 5.99,
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV5PvHkOkYQgdcjPeOPcAZMe25njiAq_rMIA&s",
//     },
//     {
//       id: 2,
//       name: "Pizza",
//       price: 8.99,
//       image: "https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=",
//     },
//     {
//       id: 3,
//       name: "Pasta",
//       price: 7.49,
//       image: "https://media.istockphoto.com/id/857927726/photo/pasta-with-meat-tomato-sauce-and-vegetables.jpg?s=612x612&w=0&k=20&c=1bcoXcBKM7Hb1ASweDx-vcwXEgy-WrCGM71dVP2Cp0w=",
//     },
//     {
//       id: 4,
//       name: "Salad",
//       price: 4.99,
//       image: "https://www.refreshmyhealth.com/wp-content/uploads/2020/07/how-to-make-a-simple-salad-recipe-vegan-gluten-free-lunch_260-main_img_6804-lrcc.jpg",
//     },
//     {
//       id: 5,
//       name: "Fries",
//       price: 2.99,
//       image: "https://thesaltedpotato.com/wp-content/uploads/2022/04/twice-fried-fries.jpg",
//     },
//     {
//       id: 6,
//       name: 'Margherita Pizza',
//       image: 'https://example.com/images/margherita-pizza.jpg',
//       price: 8.99,
//     },
//     {
//       id: 7,
//       name: 'Cheeseburger',
//       image: 'https://example.com/images/cheeseburger.jpg',
//       price: 5.99,
//     },
//     {
//       id: 8,
//       name: 'Caesar Salad',
//       image: 'https://example.com/images/caesar-salad.jpg',
//       price: 7.49,
//     },
//     {
//       id: 9,
//       name: 'Spaghetti Carbonara',
//       image: 'https://example.com/images/spaghetti-carbonara.jpg',
//       price: 9.99,
//     },
//     {
//       id: 10,
//       name: 'Grilled Chicken Sandwich',
//       image: 'https://example.com/images/grilled-chicken-sandwich.jpg',
//       price: 6.99,
//     },
//     {
//       id: 11,
//       name: 'Chocolate Brownie',
//       image: 'https://example.com/images/chocolate-brownie.jpg',
//       price: 3.99,
//     },
//     {
//       id: 12,
//       name: 'Vegetable Sushi Roll',
//       image: 'https://example.com/images/vegetable-sushi-roll.jpg',
//       price: 10.49,
//     },
//     {
//       id: 13,
//       name: 'Chicken Biryani',
//       image: 'https://example.com/images/chicken-biryani.jpg',
//       price: 12.99,
//     },
//     {
//       id: 14,
//       name: 'Tandoori Paneer Wrap',
//       image: 'https://example.com/images/tandoori-paneer-wrap.jpg',
//       price: 7.99,
//     },
//     {
//       id: 15,
//       name: 'Mango Smoothie',
//       image: 'https://example.com/images/mango-smoothie.jpg',
//       price: 4.99,
//     },
//   ];

//   // Load cart from localStorage when the component mounts
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("UserCart"));
//     if (savedCart) {
//       setCart(savedCart);
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     if (cart.length > 0) {
//       localStorage.setItem("UserCart", JSON.stringify(cart));
//     }
//   }, [cart]);

//   // Add item to cart
//   const addToCart = (item) => {
//     dispatch(cartActions.IncreaseCount())
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
//       if (existingItem) {
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
      

//       return [...prevCart, { ...item, quantity: 1 }];
//     });
    
//   };

//   // Remove item from cart
//   const removeFromCart = (itemId) => {
//     dispatch(cartActions.DecreaseCount())
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
    

//   };

//   // Clear the entire cart
//   const clearCart = () => {
//     dispatch(cartActions.SetNull())
//     setCart([]);
//     localStorage.removeItem("UserCart"); // Remove cart from localStorage
//   };

//   // Calculate total cost
//   const calculateTotal = () => {
//     return cart.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     ).toFixed(2);
//   };

//   return (
//     <div className="container mt-[60px] mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Food Ordering</h1>
//       <div className="grid grid-cols-2 gap-8">
//         {/* Menu Section */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-3">Menu</h2>
//           <ul className="space-y-4">
//             {menuItems.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center bg-gray-100 p-4 rounded shadow"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div className="flex-1 ml-4">
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-gray-600">${item.price.toFixed(2)}</p>
//                 </div>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   onClick={() => addToCart(item)}
//                 >
//                   Add to Cart
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Cart Section */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-3">Your Cart</h2>
//           {cart.length === 0 ? (
//             <p className="text-gray-600">Your cart is empty.</p>
//           ) : (
//             <ul className="space-y-4">
//               {cart.map((item) => (
//                 <li
//                   key={item.id}
//                   className="flex items-center bg-gray-100 p-4 rounded shadow"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div className="flex-1 ml-4">
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-gray-600">
//                       ${item.price.toFixed(2)} x {item.quantity}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       -
//                     </button>
//                     <button
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                       onClick={() => addToCart(item)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//           <div className="mt-4 font-bold text-lg">
//             Total: ${calculateTotal()}
//           </div>
//           <button
//             onClick={clearCart}
//             className="bg-red-500 active:bg-red-700 rounded-lg p-3 text-white mt-4"
//           >
//             Clear Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodOrderingPage;

