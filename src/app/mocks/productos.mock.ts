export const productList = () => {
   return [
   {
      "id": 1,
      "codigo": "PRD001",
      "nombre": "Camiseta",
      "descripcion": "Camiseta de algodón de manga corta",
      "categoria": "Ropa",
      "precios": [
         {"cantidad": 1, "precio_unitario": 20.99},
         {"cantidad": 3, "precio_unitario": 18.99},
         {"cantidad": 5, "precio_unitario": 16.99}
      ],
      "imagen": "url_de_la_imagen_1.jpg",
      "disponibilidad": true,
      "marca": "MarcaX",
      "color": "Azul",
      "tallas": ["S", "M", "L", "XL"],
      "valoracion": 4.5,
      "num_valoraciones": 100,
      "fecha_lanzamiento": "2023-01-15",
      "material": "Algodón",
      "dimensiones": {
         "longitud": 70,
         "anchura": 50,
         "altura": 5
      },
      "peso": 200,
      "descuento": 10
   },
   {
      "id": 2,
      "codigo": "PRD002",
      "nombre": "Pantalón",
      "descripcion": "Pantalón vaquero para hombre",
      "categoria": "Ropa",
      "precios": [
         {"cantidad": 1, "precio_unitario": 34.99},
         {"cantidad": 3, "precio_unitario": 32.99},
         {"cantidad": 5, "precio_unitario": 29.99}
      ],
      "imagen": "url_de_la_imagen_2.jpg",
      "disponibilidad": true,
      "marca": "MarcaY",
      "color": "Negro",
      "tallas": ["30", "32", "34", "36"],
      "valoracion": 4.2,
      "num_valoraciones": 80,
      "fecha_lanzamiento": "2022-11-20",
      "material": "Mezclilla",
      "dimensiones": {
         "longitud": 100,
         "anchura": 80,
         "altura": 10
      },
      "peso": 500,
      "descuento": 15
   },
   {
      "id": 3,
      "codigo": "PRD003",
      "nombre": "Zapatillas deportivas",
      "descripcion": "Zapatillas deportivas para correr",
      "categoria": "Calzado",
      "precios": [
         {"cantidad": 1, "precio_unitario": 49.99},
         {"cantidad": 3, "precio_unitario": 46.99},
         {"cantidad": 5, "precio_unitario": 42.99}
      ],
      "imagen": "url_de_la_imagen_3.jpg",
      "disponibilidad": true,
      "marca": "MarcaZ",
      "color": "Blanco",
      "tallas": ["39", "40", "41", "42"],
      "valoracion": 4.7,
      "num_valoraciones": 120,
      "fecha_lanzamiento": "2023-03-10",
      "material": "Malla transpirable",
      "dimensiones": {
         "longitud": 280,
         "anchura": 110,
         "altura": 90
      },
      "peso": 350,
      "descuento": 0
   },
   {
      "id": 4,
      "codigo": "PRD004",
      "nombre": "Bufanda",
      "descripcion": "Bufanda de lana suave y cálida",
      "categoria": "Accesorios",
      "precios": [
         {"cantidad": 1, "precio_unitario": 15.99},
         {"cantidad": 3, "precio_unitario": 13.99},
         {"cantidad": 5, "precio_unitario": 11.99}
      ],
      "imagen": "url_de_la_imagen_4.jpg",
      "disponibilidad": true,
      "marca": "MarcaA",
      "color": "Gris",
      "valoracion": 4.0,
      "num_valoraciones": 60,
      "fecha_lanzamiento": "2022-12-05",
      "material": "Lana",
      "dimensiones": {
         "longitud": 180,
         "anchura": 25,
         "altura": 2
      },
      "peso": 150,
      "descuento": 20
   },
   {
      "id": 5,
      "codigo": "PRD005",
      "nombre": "Gorra",
      "descripcion": "Gorra ajustable con diseño moderno",
      "categoria": "Accesorios",
      "precios": [
         {"cantidad": 1, "precio_unitario": 12.99},
         {"cantidad": 3, "precio_unitario": 10.99},
         {"cantidad": 5, "precio_unitario": 9.99}
      ],
      "imagen": "url_de_la_imagen_5.jpg",
      "disponibilidad": true,
      "marca": "MarcaB",
      "color": "Rojo",
      "valoracion": 4.3,
      "num_valoraciones": 70,
      "fecha_lanzamiento": "2022-10-20",
      "material": "Algodón y poliéster",
      "dimensiones": {
         "longitud": 20,
         "anchura": 15,
         "altura": 10
      },
      "peso": 100,
      "descuento": 10
   }
   ]

}