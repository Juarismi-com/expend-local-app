export interface Producto {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    categoria: string;
    precios: { cantidad: number; precio_unitario: number; }[];
    imagen: string;
    disponibilidad: boolean;
    marca: string;
    color: string;
    tallas?: string[]; 
    valoracion: number;
    num_valoraciones: number;
    fecha_lanzamiento: string;
    material: string;
    dimensiones: { longitud: number; anchura: number; altura: number; };
    peso: number;
    descuento: number;
  }