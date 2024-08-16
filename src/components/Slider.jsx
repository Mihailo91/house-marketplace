import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from "../firebase.config"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Spinner } from "./Spinner"
import { Navigation, Pagination } from 'swiper/modules';

function Slider() {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {

        const fethcListings = async () => {
            const listingRef = collection(db, 'listings')
            const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
            const querySnap = await getDocs(q)

            let listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings(listings)
            setLoading(false)
        }
        console.log(listings)
        fethcListings()

    }, [])

    if (loading) {
        <Spinner />
    }

    if (listings && listings.length === 0) {
        return <></>
    }
    return listings && (
        <>
            <p className="exploreHeading">Recommended</p>
            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Navigation, Pagination]}>
                {listings.map(({ data, id }) => (
                    <SwiperSlide
                        key={id}
                        onClick={() => navigate(`/category/${data.type}/${id}`)}
                    >
                        <div
                            style={{
                                background: `url(${data.imageUrls[0]}) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                            className='swiperSlideDiv'
                        >
                            <p className='swiperSlideText'>{data.name}</p>
                            <p className='swiperSlidePrice'>
                                ${data.discountedPrice ?? data.regularPrice}{' '}
                                {data.type === 'rent' && '/ month'}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Slider