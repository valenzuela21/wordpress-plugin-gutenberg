const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { withSelect } = wp.data;

/** import icons customs **/
import { ReactComponent as Logo } from '../ga-logo.svg'

registerBlockType('ga/dinamico', {
    title: 'GA Dinamico Recipe Back',
    icon: {
        src: Logo
    },
    category: 'gourmet-artist',
    attributes: {},
    supports: {
        align: ['wide', 'full']
    },
    edit: withSelect(select => {
        return {
            //Condsut api wordpress REST API back recipe
            posts: select("core").getEntityRecords("postType", "post", {
                per_page: 3,
                offset: 0
            })
        }
    })(({ posts }) => {
   
        // Get data post
        if (!posts) {
            return 'Loader ...';
        }

        if (posts && posts.length === 0) {
            return 'Not Found';
        }
       
        return (
            <div>
                <h2>Back Recipes</h2>
                <ul className='ultimas-recetas contenido'>
                    {posts.map(post => (
                        <li>
                            <img src={post.featured_image_src} />
                            <div className='contenido'>
                                <h3>{post.title.rendered}</h3>
                                <p>
                                    <RichText.Content value={post.content.rendered.substring(0, 80) +  '...'} />
                                </p>
                            </div>
                            <a href={post.link} className="boton" > Ver más</a>
                        </li>
                    ))}
                </ul>
            </div>
        )

    }),
    save: () => {
        return null;
    }
});