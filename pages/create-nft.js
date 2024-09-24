import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTheme } from 'next-themes';
import { Button, Input } from '@/components';
import Image from 'next/image';
import images from '../assets';
import { NFTContext } from '../context/NFTContext';
import { useRouter } from 'next/router';

const CreateNFTs = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ price: '', name: '', description: '' });
  const { theme } = useTheme();
  const { uploadToPinata, createNFT } = useContext(NFTContext); 
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => setFileUrl(reader.result);
      reader.readAsDataURL(file);

      // Upload the file to Pinata and get the URL
      try {
        const url = await uploadToPinata(file);
        console.log('Uploaded URL:', url);
        setFileUrl(url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }, [uploadToPinata]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = React.useMemo(() => (
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex-col items-center p-4 rounded-md border-dashed 
    ${isDragActive ? 'border-file-active' : ''}
    ${isDragAccept ? 'border-file-accept' : ''}
    ${isDragReject ? 'border-file-reject' : ''}`
  ), [isDragActive, isDragAccept, isDragReject]);

  return (
    <div className='flex justify-center sm:px-4 p-12'>
      <div className='w-3/5 md:w-full'>
        <h1 className='font-poppins dark:text-white text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0'>Create new NFT</h1>
        <div className='mt-16'>
          <p className='font-poppins dark:text-white text-nft-black-1'>Upload File</p>
          <div className='mt-4'>
            <div {...getRootProps({ className: `${fileStyle} p-4 md:p-6` })}>
              <input {...getInputProps()} />
              <p className='dark:text-white text-nft-black-1 font-semibold text-lg text-center'>
                Drag and drop some files here, or click to select files (JPG, PNG, GIF)
              </p>
              <div className='my-6 w-full flex justify-center'>
                <Image
                  src={images.upload}
                  width={80}
                  height={80}
                  objectFit='contain'
                  alt='file_upload'
                  className={`${theme === 'light' ? 'filter invert' : ''} w-20 h-20`}
                />
              </div>
              <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm text-center'>
                Drag and Drop
              </p>
              <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm text-center mt-2'>
                or Browse media on your device
              </p>
            </div>
          </div>
          {fileUrl && (
            <aside className='mt-4'>
              <img src={fileUrl} alt="asset_file" className="max-h-60 md:max-h-40 max-w-full object-contain" />
            </aside>
          )}
        </div>
        <Input
          inputType="input"
          title="Name"
          placeholder="NFT name"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) => setFormInput({ ...formInput, description: e.target.value })}
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
        />
        <div className='mt-7 w-full flex justify-end'>
          <Button
            btnName="Create NFT"
            className="rounded-xl"
            handleClick={() => {
              console.log('Create NFT button clicked!');
              console.log(formInput);
              createNFT(formInput, fileUrl, router);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFTs;
