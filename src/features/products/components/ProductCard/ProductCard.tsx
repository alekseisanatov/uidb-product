import { memo } from "react";
import { Link } from "react-router-dom";
import type { T_Device } from "../../../../types/product";
import { getDeviceImageUrl, GRID_IMAGE_SIZE } from "../../../../lib/imageUrl";
import styles from "./ProductCard.module.css";

interface I_ProductCardProps {
  device: T_Device;
}

const ProductCardComponent = ({ device }: I_ProductCardProps) => {
  const imageUrl = getDeviceImageUrl(device, GRID_IMAGE_SIZE);

  return (
    <Link to={`/devices/${device.id}`} className={styles.card}>
      {device.line?.name && (
        <span className={styles.line}>{device.line.name}</span>
      )}
      <div className={styles.imageWrapper}>
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
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{device.product?.name ?? "Unknown"}</span>
        <span className={styles.shortname}>{device.shortnames?.[0] ?? ""}</span>
      </div>
    </Link>
  );
};

export const ProductCard = memo(ProductCardComponent);
