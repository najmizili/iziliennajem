import React from "react";
import Item from "./Item";
import { useState } from "react";
import { useEffect } from "react";

const ItemList = ({ productos }) => {
  const [encontrado, setEncontrado] = useState([]);

  const filtradoPorNombre = (nombre) => {
    if (nombre) {
      const encontrado = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      setEncontrado(encontrado);
    } else {
      setEncontrado(productos);
    }
  };

  const filtradoPorStock = () => {
    const encontrado = productos.filter((producto) => producto.stock > 0);
    setEncontrado(encontrado);
  };

  useEffect(() => {
    setEncontrado(productos);
    filtradoPorStock();
  }, [productos]);

  return (
    <div>
<div className="flex justify-right items-center mt-[-0.73cm]" style={{ marginLeft: '1.3cm' }}>
  <input
    className="border border-gray-300 rounded-md px-0 py-0 mb-0 bg-transparent"
    style={{ borderColor: '#267469' }}
    onChange={(e) => filtradoPorNombre(e.target.value)}
    placeholder="  Search product"
  />
</div>


      {encontrado.length === 0 ? (
        <div className="container mx-auto mt-10 p-1 bg-green-900 rounded max-w-xs">
          <p className="text-white text-lg font-semibold text-center">
          No results found
          </p>
        </div>
      ) : (
        <div>
          {productos.stock >= 0 ? () => filtradoPorNombre() : null}
          <div className="grid smMax:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mx-auto max-w-screen-2xl mm:flex flex-col mm3:flex">
            {encontrado.map((producto) => (
              <div key={producto.nombre}>
                <Item
                  id={producto.id}
                  nombre={producto.nombre}
                  desc={producto.description}
                  stock={producto.stock}
                  price={producto.price}
                  img={producto.img}
                  categoryId={producto.categoryId}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;