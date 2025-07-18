/**************************************************************************************************
GALLERY PAGE BY TEMPLATE
**************************************************************************************************/
import { Grid, Stack } from '@mui/material';
import PageLayout from '../layout/page-layout'
import * as ST from '../elements/styled-elements'
import ImageGallery from '../elements/display/image-gallery';


const photoLs = [
    {
        path: require('../assets/photos/black.knights 1547 boat.jpg'),
        title: "Black Knight's Boat",
        width: 690,
        height: 497,
    },
    {
        path: require('../assets/photos/black.knights 1624 kings.archer.jpg'),
        title: "King's Archer",
        width: 373,
        height: 261,
    },
    {
        path: require('../assets/photos/black.knights 6009 black.knight.jpg'),
        title: "Black Knight",
        width: 690,
        height: 494,
    },
    {
        path: require('../assets/photos/black.knights 6034 monarchs.ghost.jpg'),
        title: "Monarch's Ghost",
        width: 690,
        height: 492,
    },
    {
        path: require('../assets/photos/black.knights 6057 sea.serpent.jpg'),
        title: "Sea Serpent",
        width: 690,
        height: 482,
    },
    {
        path: require('../assets/photos/black.knights 6059 knights.stronghold.jpg'),
        title: "Knight's Stronghold",
        width: 690,
        height: 458,
    },
    {
        path: require('../assets/photos/black.knights 6085 monarchs.castle 01.jpg'),
        title: "Monarch's Castle",
        width: 2560,
        height: 1547,
    },
    {
        path: require('../assets/photos/black.knights 6086 black.knights.castle.jpg'),
        title: "Black Knight's Castle",
        width: 998,
        height: 596,
    },
];


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
