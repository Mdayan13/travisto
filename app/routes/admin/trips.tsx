import { Headers } from 'components/index';
const trips = () => {
  return (
    <main className='all-users wrapper'>
      <Headers title="Trips"
          description="find perfect trip with the help of AI"
          ctaText="create the trip"
          CtaUrl="/trips/create"/>
          </main>
  )
}

export default trips