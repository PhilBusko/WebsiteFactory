/**************************************************************************************************
GALLERY PAGE BY TEMPLATE
**************************************************************************************************/
import { Grid, Stack } from '@mui/material';
import PageLayout from '../layout/page-layout'
import * as ST from '../elements/styled-elements'
import ImageGallery from '../elements/display/image-gallery';


// PHOTOS


function GalleryPage(props) {

    return (
        <PageLayout>
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.TitleText>Gallery Page</ST.TitleText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12}>
                    <ST.ContentCard elevation={3}> 

                        <ST.TitleText>Photos Gallery</ST.TitleText>

                        <ImageGallery imageLs={ photoLs }></ImageGallery>

                    </ST.ContentCard>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default GalleryPage;
