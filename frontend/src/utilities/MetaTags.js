// Helmet-Async
import { Helmet } from 'react-helmet-async'

const MetaTags = ({title, description}) => {

	return (
		<Helmet>
			<title>StudioFlow {title ? ` - ${title}` : ''}</title>
		</Helmet>
	)
}
export default MetaTags