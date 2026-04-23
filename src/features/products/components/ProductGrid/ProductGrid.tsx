import type { T_Device } from "../../../../types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

interface I_ProductGridProps {
    devices: T_Device[];
}

export const ProductGrid = ({ devices }: I_ProductGridProps) => {
    return (
        <div className={styles.grid}>
            {devices.map((device) => (
                <ProductCard key={device.id} device={device} />
            ))}
        </div>
    );
};
