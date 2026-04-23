import { memo } from "react";
import { Link } from "react-router-dom";
import type { T_Device } from "../../../../types/product";
import { getDeviceImageUrl, LIST_IMAGE_SIZE } from "../../../../lib/imageUrl";
import styles from "./ProductList.module.css";

interface I_ProductListProps {
    devices: T_Device[];
}

const ProductRowComponent = ({ device }: { device: T_Device }) => {
    const imageUrl = getDeviceImageUrl(device, LIST_IMAGE_SIZE);
    return (
        <Link to={`/devices/${device.id}`} className={styles.row}>
            <span className={styles.colImage}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={device.product?.name ?? "Device"}
                        className={styles.image}
                        loading="lazy"
                    />
                ) : (
                    <div className={styles.noImage} />
                )}
            </span>
            <span className={styles.colLine}>{device.line?.name ?? "—"}</span>
            <span className={styles.colName}>
                {device.product?.name ?? "Unknown"}
            </span>
        </Link>
    );
};

const ProductRow = memo(ProductRowComponent);

export const ProductList = ({ devices }: I_ProductListProps) => {
    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <span className={styles.colImage} />
                <span className={styles.colLine}>Product Line</span>
                <span>Name</span>
            </div>
            {devices.map((device) => (
                <ProductRow key={device.id} device={device} />
            ))}
        </div>
    );
};
