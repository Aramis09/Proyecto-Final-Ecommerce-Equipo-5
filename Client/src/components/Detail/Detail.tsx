import { PRUEBA } from '../../prueba';
import { useState, useEffect } from 'react';
import styles from './Carousel.module.css';


export const Detail = () => {

    const sliceItems = PRUEBA.slice(0, 3);
	const [currentImage, setCurrentImage] = useState(0);

	const handleChangeImage = () => {
		setCurrentImage(
			currentImage === sliceItems.length - 1 ? 0 : currentImage + 1,
		);
	};

	useEffect(() => {
		const intervalId = setInterval(handleChangeImage, 5000);
		return () => clearInterval(intervalId);
    }, []);
    
    return (
			<div className='Detail'>
				<img src={PRUEBA[0].background_image} alt='Imagen Game' />
				<div className='Section 1'>
					<span>{PRUEBA[0].name}</span>
					<span>{PRUEBA[0].price}</span>
					<span>{PRUEBA[0].rating}</span>
				</div>
				<div className='Section 2'>
					<p>{PRUEBA[0].description}</p>
					<span>{PRUEBA[0].genres}</span>
					<span>{PRUEBA[0].platforms}</span>
				</div>
				<section className={styles['carousel-container']}>
					{sliceItems.map((item, index) => {
						return (
							<div key={index} className={styles['card-carousel']}>
								<div className={styles['img-carousel']}>
									{currentImage === index ? (
										<img src={item.background_image} alt={item.name} />
									) : null}
								</div>
								<div className={styles['description-carousel']}>
									{currentImage === index ? (
										<>
											<div className={styles.description}>
												<h2>{item.name}</h2>
												{item.description}
												<button>Go</button>
											</div>
										</>
									) : null}
								</div>
							</div>
						);
					})}
				</section>
			</div>
		);
};
