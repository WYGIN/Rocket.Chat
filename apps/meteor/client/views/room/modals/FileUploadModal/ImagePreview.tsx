import { Box } from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import React, { useState, useRef } from 'react';

import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/themes/compact.css';

import GenericPreview from './GenericPreview';
import PreviewSkeleton from './PreviewSkeleton';

type ImagePreviewProps = {
	url: string;
	file: File;
};

const ImagePreview = ({ url, file }: ImagePreviewProps): ReactElement => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	//const cropperRef = useRef<CropperRef>(null);

	const handleLoad = (): void => setLoading(false);
	const handleError = (): void => {
		setLoading(false);
		setError(true);
	};
	const defaultSize = ({ imageSize, visibleArea }) => {            
		return {                
			width: (visibleArea || imageSize).width,                
			height: (visibleArea || imageSize).height,            
		};    
	}

	if (error) {
		return <GenericPreview file={file} />;
	}

	return (
		<>
			{loading && <PreviewSkeleton />}
			{/*<Box
				is='Cropper'
				src={url}
				maxWidth='full'
				style={{ objectFit: 'contain' }}
				onLoad={handleLoad}
				onError={handleError}
				display={loading ? 'none' : 'initial'}
                                ref={cropperRef}
                                defaultSize={defaultSize}
                                stencilProps={{
					 grid: true
				}}
			/>*/}
			<Cropper
				src={url}
				style={{ objectFit: 'contain' }}
				stencilProps={{
					 grid: true
				}}
				maxWidth='full'
				defaultSize={defaultSize}
				onLoad={handleLoad}
				onError={handleError}
				display={loading ? 'none' : 'initial'}
				/>
		</>
	);
};

export default ImagePreview;
