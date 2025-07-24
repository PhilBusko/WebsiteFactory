/**************************************************************************************************
IMAGE GALLERY
**************************************************************************************************/
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import { Gallery, Item as GalleryItem } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import * as ST from '../styled-elements';


const StyledImageItem = styled(ImageListItem)(({ theme }) => ({
    border: '1px solid black',
    borderRadius: '2px', 
    alignItems: 'center', 
    justifyContent: 'center', 
}));

const StyledItemBar = styled(ImageListItemBar)(({ theme }) => ({
    maxHeight: '30px',
    fontFamily: 'Roboto', 
    padding: '2px 6px',
    '& .MuiImageListItemBar-titleWrap': {padding: '0px'},
}));

const ThumbnailImage = styled('img')(({ theme }) => ({
    width: 200, 
    cursor: 'pointer', 
}));


function ImageGallery(props) {

    const theme = useTheme();
    var galleryCols = 1;
    if ( useMediaQuery(theme.breakpoints.up('md')) )
        galleryCols = 3;
    if ( useMediaQuery(theme.breakpoints.up('lg')) )
        galleryCols = 4;

    return (
        <ImageList cols={ galleryCols } gap={ 8 }>
            <Gallery withCaption>
                { props.imageLs.map( (imgInfo, key) => (
                    <StyledImageItem key={key}>
                        <ST.FlexVertical sx={{ flexDirection: 'column', height: '100%' }}>
                            <GalleryItem 
                                original={ imgInfo.path } 
                                width={ imgInfo.width } 
                                height={ imgInfo.height }
                                caption={ ` <div style="
                                                font-family: Roboto;
                                                font-size: 26px;
                                                color: gold;
                                                text-shadow: -1px 1px 0 black, 1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black;
                                            ">
                                                ${imgInfo.title}
                                            </div>` }
                            >
                                {({ ref, open }) => (
                                    <ThumbnailImage src={ imgInfo.path } ref={ref} onClick={open} />
                                )}
                            </GalleryItem>
                        </ST.FlexVertical>
                        <StyledItemBar title={ imgInfo.title } position='below' />
                    </StyledImageItem>
                )) }
            </Gallery>
        </ImageList>
    );
}

ImageGallery.defaultProps = {
    imageLs: [],
};

export default ImageGallery;
