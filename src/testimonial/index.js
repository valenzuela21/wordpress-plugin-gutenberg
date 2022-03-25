const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { IconButton } = wp.components

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
        imageTestimonials:{
            type: 'string',
            source: 'attribute',
            attribute: 'src',
            selector: '.testimonial-info img',
            default: Logo
        }

    },

    edit: props => {

        // Extra values props state
        const { attributes: { textTestimonials, textNameTestimonials, imageTestimonials }, setAttributes } = props

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
           setAttributes({ imageTestimonials: imagen.sizes.medium.url})
        }

        return (
            <div className='testimonial-block' >
                <blockquote>
                    <RichText
                        placeholder="Add text testimonials"
                        onChange={onChangeTextTestimonials}
                        value={textTestimonials}
                    />
                </blockquote>
                <div className="testimonial-info">
                    <img src={imageTestimonials} />
                    <MediaUpload 
                        onSelect={onSelectImage}
                        type="image"
                        value={imageTestimonials}
                        render={({open})=> (
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
                        />
                    </p>
                </div>
            </div>
        );
    },

    save: props => {
        // Extra values props state
        const { attributes: { textTestimonials, textNameTestimonials, imageTestimonials } } = props
        return (
            <div className='testimonial-block' >
                <blockquote>
                    <RichText.Content value={textTestimonials} />
                </blockquote>
                <div className="testimonial-info">
                    <img src={imageTestimonials} />
                    <p>
                        <RichText.Content value={textNameTestimonials} />
                    </p>
                </div>
            </div>
        );
    }
});