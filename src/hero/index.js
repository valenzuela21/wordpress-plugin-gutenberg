const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, BlockControls, AlignmentToolbar } = wp.editor;
const { IconButton } = wp.components

/** import icons customs **/
import { ReactComponent as Logo } from '../ga-logo.svg'

registerBlockType('ga/hero', {
    title: 'GA Hero',
    icon: {
        src: Logo
    },
    category: 'gourmet-artist',
    attributes: {
        titleHero: {
            type: 'string',
            source: 'html',
            selector: '.hero-block h1'
        },
        descriptionHero: {
            type: 'string',
            source: 'html',
            selector: '.hero-block p'
        },
        imageHero: {
            type: 'string',
            selector: '.hero-block',
        },
        alignContenHero:{
            type: 'string',
            default: 'center'
        }
    },
    supports:{
        align: ['wide', 'full']
    },

    edit: props => {

        // Extra of values the groups
        const { attributes: { titleHero, descriptionHero, imageHero, alignContenHero }, setAttributes } = props

        // Access of title the hero
        const onChangeTitle = titleTXT => {
            setAttributes({ titleHero: titleTXT });
        }

        const onChangeDescription = descriptionTXT => {
            setAttributes({ descriptionHero: descriptionTXT });
        }

        const onSelectImage = imagen => {
            setAttributes({ imageHero: imagen.sizes.full.url })
        }

        // Access Align toolbar
        const onChangeLineContent = newAlign => {
            setAttributes({alignContenHero: newAlign})
        }

        return (
            <div className='hero-block' style={{ backgroundImage: `url(${imageHero})` }} >
                <BlockControls>
                    <AlignmentToolbar
                        onChange={onChangeLineContent}
                    />
                </BlockControls>
                <MediaUpload
                    onSelect={onSelectImage}
                    type="image"
                    value={imageHero}
                    render={({ open }) => (
                        <IconButton onClick={open}
                            icon="format-image"
                            showToolTip="true"
                            label="Change Image"
                        />
                    )}
                />
                <h1>
                    <RichText
                        placeholder="Add title"
                        value={titleHero}
                        onChange={onChangeTitle}
                        style={{textAlign: alignContenHero}}
                    />
                </h1>
                <p>
                    <RichText
                        placeholder="Add description"
                        value={descriptionHero}
                        onChange={onChangeDescription}
                    />
                </p>
            </div>
        )
    },
  
    save: props => {
        const { attributes: { titleHero, descriptionHero, imageHero, alignContenHero } } = props

        return (
            <div className='hero-block' style={{ backgroundImage: `url(${imageHero})`, textAlign: alignContenHero }} >
                <h1>
                    <RichText.Content value={titleHero} />
                </h1>
                <p> <RichText.Content value={descriptionHero} /></p>
            </div>)
    }
});