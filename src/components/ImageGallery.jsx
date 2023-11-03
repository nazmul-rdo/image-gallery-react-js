import React, { useEffect, useState } from "react";
import { AiFillPicture } from "react-icons/ai";

import image1 from './images/image-1.webp'
import image2 from './images/image-2.webp'
import image3 from './images/image-3.webp'
import image4 from './images/image-4.webp'
import image5 from './images/image-5.webp'
import image6 from './images/image-6.webp'
import image7 from './images/image-7.webp'
import image8 from './images/image-8.webp'
import image9 from './images/image-9.webp'
import image10 from './images/image-10.jpeg'
import image11 from './images/image-11.jpeg'


const ImageGallery = () => {

    const [images, setImages] = useState([
        { id: 1, src: image1, isSelected: false },
        { id: 2, src: image2, isSelected: false },
        { id: 3, src: image3, isSelected: false },
        { id: 4, src: image4, isSelected: false },
        { id: 5, src: image5, isSelected: false },
        { id: 6, src: image6, isSelected: false },
        { id: 7, src: image7, isSelected: false },
        { id: 8, src: image8, isSelected: false },
        { id: 9, src: image9, isSelected: false },
        { id: 10, src: image10, isSelected: false },
        { id: 11, src: image11, isSelected: false },
    ]);

    const [newImage, setNewImage] = useState("");
    const [draggedImage, setDraggedImage] = useState(null);
    const [moveImage, setMoveImage] = useState(null);

    const [selectedCount, setSelectedCount] = useState(0);
    const [isAllSelected, setIsAllSelected] = useState(false);


    useEffect(() => {
        let count = 0;
        images.forEach((image) => {
            if (image.isSelected) {
                count += 1;
            }
        });
        setSelectedCount(count);
    }, [selectedCount, images]);

    useEffect(() => {
        if (isAllSelected) {
            const updatedImages = images.map((image) => ({
                ...image,
                isSelected: false,
            }));
            setImages(updatedImages);
        }
    }, [isAllSelected, images]);

    const allcheckBox = () => {
        setIsAllSelected(false);
    };

    const handleImageDragStart = (e, image) => {
        setDraggedImage(image);
        setMoveImage(image)
    };

    const handleImageDrop = (e, targetImage) => {
        e.preventDefault();

        const draggedImageIndex = images.findIndex((image) => image.id === draggedImage.id);
        const targetImageIndex = images.findIndex((image) => image.id === targetImage.id);

        if (draggedImageIndex !== -1 && targetImageIndex !== -1) {
            const updatedImages = [...images];
            const [draggedImageItem] = updatedImages.splice(draggedImageIndex, 1);
            updatedImages.splice(targetImageIndex, 0, { ...draggedImageItem, isSelected: targetImage.isSelected });

            setImages(updatedImages);
            setDraggedImage(null);
            console.log("Updated Image Order:", updatedImages);
        }
    };

    const handleonDragOver = (e, overTargetImg) => {
        e.preventDefault();
        
        const moveImage = [...images];

        const draggedImageIndex = moveImage.findIndex((image) => image.id === draggedImage.id);
        const targetImageIndex = moveImage.findIndex((image) => image.id === overTargetImg.id);

        if (draggedImageIndex !== -1 && targetImageIndex !== -1) {

            const [draggedImageItem] = moveImage.splice(draggedImageIndex, 1);
            moveImage.splice(targetImageIndex, 0, draggedImageItem);

            setImages(moveImage);
            console.log(moveImage);

        }
    };


    const handleDragEnter = (index) => {
        setMoveImage(index);
    };

    const handleDragLeave = () => {
        setMoveImage(null)
    }

    const handleDragEnd = () => {
        setDraggedImage(null);
        setMoveImage(null);
    }


    const handleDelete = () => {
        const updatedImages = images.filter((image) => !image.isSelected);
        setImages(updatedImages);
    };

    const handleImageCheckboxChange = (imageId) => {
        const updatedImages = images.map((image) => {
            if (image.id === imageId) {
                return { ...image, isSelected: !image.isSelected };
            }
            return image;
        });
        setImages(updatedImages);
    };


    const handleAddImage = () => {
        if (newImage !== "") {
            const newId = images.length + 1;
            const newImageData = {
                id: newId,
                src: newImage,
                isSelected: false,
            };
            const updatedImages = [...images, newImageData];
            setImages(updatedImages);
            setNewImage("");
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    console.log(draggedImage)

    return (
        <section>
            <div className="top-continer">
                {!selectedCount ?
                    <div className="header">
                        <h1>Gallery</h1>
                    </div> :
                    <div className="delete-button-container">
                        <div className="file-selected">
                            <input
                                className="header-checkbox"
                                type="checkbox"
                                onClick={allcheckBox}
                                checked
                            />
                            <p>{selectedCount} Files Selected</p>
                        </div>
                        <button
                            onClick={handleDelete}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                }
            </div>
            <div className="image-gallery">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={` ${!moveImage && draggedImage === image ? "image-container drg" : "image-container"}${draggedImage === image && !moveImage ? ' dragging ' : ' '}`}
                        draggable
                        onDragStart={(e) => handleImageDragStart(e, image)}
                        onDrop={(e) => handleImageDrop(e, image)}
                        onDragOver={(e) => handleonDragOver(e, image)}
                        onDragEnter={(e) => handleDragEnter(index)}
                        onDragLeave={handleDragLeave}
                        onDragEnd={handleDragEnd}
                    >

                        <img src={image.src} alt="" />
                        {
                            draggedImage ? "" : (
                                <div className={` ${moveImage === index ? ' ' : 'overlay'}`}>
                                    <input
                                        type="checkbox"
                                        className={image.isSelected ? 'checkbox-button selected' : 'checkbox-button'}
                                        onClick={() => handleImageCheckboxChange(image.id)}
                                    />
                                </div>
                            )
                        }
                    </div>
                ))}

                <div className="image-container input-item">
                    <label htmlFor="filename">
                        <AiFillPicture />
                    </label>
                    <input type="file" id="filename" onChange={handleImageChange} />
                    <span className="input-botton" onClick={handleAddImage}>Add Image</span>
                </div>

            </div>
        </section>
    );
};

export default ImageGallery;