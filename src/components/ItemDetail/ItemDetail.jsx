import React from "react";
import ItemCount from "./ItemCount";

const ItemDetail = ({ product }) => {
  return (
    <div className="flex justify-center items-center lg:h-screen">
      <div className="">
        <div className="grid lg3:grid-cols-1 md:grid-cols-2 gap-6 mdMAX:gap-3">
          <div className="flex justify-center">
            <div className="lg:bg-transparent p-12 rounded-2xl max-w-xl ">
              <img
                className="w-full mdMAX:w-96"
                src={product.img}
                alt=""
              />
            </div>
          </div>

          <div style={{ marginLeft: '-1cm' }} className="flex flex-col pt-20 justify-start items-start mdMAX:items-center">            <span className="text-white font-small text-base bg-black uppercase rounded-md px-2 mb-2">
              {product.categoryId}
            </span>
            <h1 className="text-2xl font-bold text-white uppercase mb-3 mdMAX:text-xl">
              {product.nombre}
            </h1>
            <p className="text-white font-normal text-lg mb-4 mdMAX:text-center mdMAX:text-base ">
              {product.description}
            </p>
            <div className="flex items-center mb-1">
              <span className="text-2xl text-white font-bold mr-2">
              {product.price} dh 
              </span>
              <span className="text-base pt-1 font-medium text-red-700">
                Stock:{" "}
                <span
                  className={
                    product.stock <= 10 ? "text-yellow-400" : "text-gray-300"
                  }
                >
                  {product.stock}
                </span>
              </span>
            </div>

            <div className="flex justify-center items-center mt-2">
              <ItemCount producto={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
