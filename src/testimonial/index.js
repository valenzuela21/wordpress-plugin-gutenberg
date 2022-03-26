const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InspectorControls, ColorPalette } = wp.editor;
const { IconButton, PanelBody } = wp.components

/** import icons customs **/
import { ReactComponent as Logo } from '../ga-logo.svg'

registerBlockType('ga/testimonial', {
    title: 'GA Testimonials',
    icon: {
        src: Logo
    },
    category: 'gourmet-artist',
    attributes: {
        textTestimonials: {
            type: 'string',
            source: 'html',
            selector: '.testimonial-block blockquote'
        },
        textNameTestimonials: {
            type: 'string',
            source: 'html',
            selector: '.testimonial-block p'
        },
        imageTestimonials: {
            type: 'string',
            source: 'attribute',
            attribute: 'src',
            selector: '.testimonial-info img',
            default: Logo
        },
        colorTestimonials: {
            type: 'string'
        }

    },

    edit: props => {

        // Extra values props state
        const { attributes: { textTestimonials, textNameTestimonials, imageTestimonials, colorTestimonials }, setAttributes } = props

        const onChangeTextTestimonials = valueTXT => {
            setAttributes({
                textTestimonials: valueTXT
            })
        }

        const onChangeTextNameTestimonials = valueTXT => {
            setAttributes({
                textNameTestimonials: valueTXT
            })
        }

        const onSelectImage = imagen => {
            setAttributes({ imageTestimonials: imagen.sizes.medium.url });
        }

        const onChangeColorTestimonials = newColor => {
            setAttributes({ colorTestimonials: newColor });
        }

        return (
            <>
                <InspectorControls>
                    <PanelBody title={"Color text and line"} >
                        <div className='components-base-controls'>
                            <div className='components-base-control__field'>
                                <label className="components_base_control__label">
                                    Color line text
                                </label>
                                <ColorPalette
                                    onChange={onChangeColorTestimonials}
                                />
                            </div>
                        </div>
                    </PanelBody>
                </InspectorControls>
                <div className='testimonial-block' style={{ borderColor: colorTestimonials }} >
                    <blockquote>
                        <RichText
                            placeholder="Add text testimonials"
                            onChange={onChangeTextTestimonials}
                            value={textTestimonials}
                            style={{ color: colorTestimonials }}
                        />
                    </blockquote>
                    <div className="testimonial-info">
                        <img src={imageTestimonials} />
                        <MediaUpload
                            onSelect={onSelectImage}
                            type="image"
                            value={imageTestimonials}
                            render={({ open }) => (
                                <IconButton onClick={open}
                                    icon="format-image"
                                    showToolTip="true"
                                    label="Select Image"
                                />
                            )}
                        />
                        <p>
                            <RichText
                                placeholder="Add name author"
                                onChange={onChangeTextNameTestimonials}
                                value={textNameTestimonials}
                                style={{ color: colorTestimonials }}
                            />
                        </p>
                    </div>
                </div>
            </>
        );
    },

    save: props => {
        // Extra values props state
        const { attributes: { textTestimonials, textNameTestimonials, imageTestimonials, colorTestimonials } } = props
        return (
            <div className='testimonial-block' style={`border-color: ${colorTestimonials}`} >
                <blockquote>
                    <RichText.Content
                        value={textTestimonials}
                     />
                </blockquote>
                <div className="testimonial-info">
                    <img src={imageTestimonials} />
                    <p style={ `color: ${colorTestimonials}` } >
                        <RichText.Content
                            value={textNameTestimonials}
                        />
                    </p>
                </div>
            </div>
        );
    }
});