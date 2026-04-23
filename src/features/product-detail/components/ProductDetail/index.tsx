import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { getDeviceImageUrl, DETAIL_IMAGE_SIZE } from "../../../../lib/imageUrl";
import { Spinner } from "../../../../components/Spinner/Spinner";
import { ErrorState } from "../../../../components/ErrorState/ErrorState";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "../../../../components/icons";
import styles from "./ProductDetail.module.css";

export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { device, prevId, nextId, isLoading, isError } = useProduct(id);
    const [imgLoaded, setImgLoaded] = useState(false);

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorState message="Failed to load device data." />;
    if (!device) return <ErrorState message="Device not found." />;

    const imageUrl = getDeviceImageUrl(device, DETAIL_IMAGE_SIZE);

    return (
        <div className={styles.wrapper}>
            <div className={styles.toolbar}>
                <button
                    className={styles.back}
                    onClick={() => navigate("/devices")}
                >
                    <ChevronLeftIcon />
                    Back
                </button>
                <div className={styles.nav}>
                    <button
                        className={styles.navBtn}
                        onClick={() => prevId && navigate(`/devices/${prevId}`)}
                        disabled={!prevId}
                        aria-label="Previous device"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        className={styles.navBtn}
                        onClick={() => nextId && navigate(`/devices/${nextId}`)}
                        disabled={!nextId}
                        aria-label="Next device"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.imageCard}>
                    {imageUrl ? (
                        <>
                            {!imgLoaded && (
                                <div className={styles.imgSkeleton} />
                            )}
                            <img
                                src={imageUrl}
                                alt={device.product?.name ?? "Device"}
                                className={styles.image}
                                style={{
                                    display: imgLoaded ? "block" : "none",
                                }}
                                onLoad={() => setImgLoaded(true)}
                            />
                        </>
                    ) : (
                        <div className={styles.noImage} />
                    )}
                </div>

                <div className={styles.details}>
                    <h1 className={styles.name}>
                        {device.product?.name ?? "Unknown"}
                    </h1>
                    {device.line?.name && (
                        <p className={styles.lineName}>{device.line.name}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
