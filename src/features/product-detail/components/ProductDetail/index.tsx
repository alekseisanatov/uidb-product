import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
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

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorState message="Failed to load device data." />;
    if (!device) return <ErrorState message="Device not found." />;

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
                <div className={styles.imageCard}></div>

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
