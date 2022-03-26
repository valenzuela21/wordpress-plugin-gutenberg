const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, URLInputButton, BlockControls, AlignmentToolbar } = wp.editor;
const { IconButton } = wp.components

/** import icons customs **/
import { ReactComponent as Logo } from '../ga-logo.svg'

registerBlockType('ga/imagetext', {
    title: 'GA Image Text',
    icon: {
        src: Logo
    },
    category: 'gourmet-artist',
    attributes: {
        appTitulo: {
            type: 'string',
            source: 'html',
            selector: '.imagen-text-block .contenido h1'
        },
        appDescription: {
            type: 'string',
            source: 'html',
            selector: '.imagen-text-block .contenido p'
        },
        appImagen: {
            type: 'string',
            source: 'attribute',
            attributes: 'src',
            selector: '.imagen-text-block img',
            default: Logo
        },
        urlApp: {
            type: 'string',
            source: 'attribute',
            attribute: 'href'
        },
        alignContent:{
            type: 'string',
            default: 'left'
        }

    },
    supports: {
        align: ['wide', 'full']
    },
    styles: [
        {
            name: 'default',
            label: 'Blue (default)',
            isDefault: true
        },
        {
            name: 'verde',
            label: 'Green'
        },
        {
            name: 'rosa',
            label: 'Pink'
        }
    ],
    edit: props => {

        const { attributes: { appTitulo, appDescription, appImagen, urlApp, alignContent }, setAttributes } = props

        const onChangeTitle = newTitle => {
            setAttributes({ appTitulo: newTitle });
        }
        const onChangeDescription = newDescription => {
            setAttributes({ appDescription: newDescription });
        }
        const onSelectionImagen = newImagen => {
            setAttributes({ appImagen: newImagen.sizes.full.url });
        }
        const onChangeUrl = newUrl => {
            setAttributes({ urlApp: newUrl })
        }

        //Access Align content
        const onAlignChange = newAlign => {
                setAttributes({alignContent: newAlign})
        }

        return [
            <BlockControls>
                <AlignmentToolbar
                    onChange={onAlignChange}
                    value={alignContent}

                />
            </BlockControls>,
            <div className='imagen-texto-block'>

                <div className="contenedor">
                    <div className="contenido" >
                        <h1>
                            <RichText
                                placeholder="Add of title"
                                value={appTitulo}
                                onChange={onChangeTitle}
                                style={{textAlign: alignContent}}
                            />
                        </h1>
                        <p>
                            <RichText
                                placeholder="Add of description"
                                value={appDescription}
                                onChange={onChangeDescription}
                                style={{textAlign: alignContent}}
                            />
                        </p>
                        <URLInputButton
                            url={urlApp}
                            onChange={onChangeUrl}
                        />
                        <a href={urlApp} className="boton">Descargar</a>
                    </div>
                    <div className='imagen'>
                        <MediaUpload
                            onSelect={onSelectionImagen}
                            type="image"
                            value={appImagen}
                            render={({ open }) => (
                                <IconButton onClick={open}
                                    icon="format-image"
                                    showToolTip="true"
                                    label="Change Image"
                                />
                            )}
                        />
                        <img src={appImagen} />
                    </div>
                </div>
            </div>
        ];
    },

    save: props => {
        const { attributes: { appTitulo, appDescription, appImagen, urlApp, alignContent } } = props;
        return (
            <div className='imagen-texto-block'>
                <div className="contenedor">
                    <div className="contenido"  style={`text-align: ${alignContent}`} >
                        <h1>
                            <RichText.Content
                                value={appTitulo}
                            />
                        </h1>
                        <p>
                            <RichText.Content
                                value={appDescription}
                            />
                        </p>
                        <a href={urlApp} className="boton">Descargar</a>
                    </div>
                    <div className='imagen'>
                        <img src={appImagen} />
                    </div>
                </div>
            </div>
        );
    }
});