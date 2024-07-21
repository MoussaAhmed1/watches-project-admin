import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { IReview } from '@/types/reviews';
import { PackageOpen, Star } from 'lucide-react';
import React from 'react';
import Noitems from '../no-items/NoItems';
import Pagination from '@/components/tables/shared/Pagination';

interface IProps {
    reviews: IReview[];
    pageCount: number;
    totalitems: number;
    pageNo: number;
}

const Reviews = ({ reviews, pageCount, totalitems,pageNo }: IProps) => {
    if (reviews.length == 0) return (
        <Noitems
            title={`No reviews`}
            icon={<PackageOpen size={60} style={{ color: "gray", fontSize: "15.2em" }}
            />}
            minHeight={450}
        />
    )
    return (
        <div style={{minHeight:500,display:'flex',flexDirection:"column",justifyContent:"space-between"}}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: "97%", justifyContent: "start" }}>
                {reviews.map(({ order_number, rating, Comment, user }) => (
                    <Card key={order_number} style={{ flex: '1 1', minWidth: '300px',maxWidth:"365px", flexWrap: "wrap" }}>
                        <CardHeader>
                            <h2 className="text-lg font-bold">{user.name}</h2>
                            <p className="text-sm text-gray-600">Order #: {order_number}</p>
                        </CardHeader>
                        <div className="mb-2 p-4">
                            <p className="text-base flex items-center gap-1">Rating:
                                <span className="stars flex">
                                    {Array.from({ length: Math.ceil(+rating) }, (ele, index) => (
                                        <Star key={index} fill="#f7d722" strokeWidth={0} size={20} />
                                    ))}
                                    {Array.from({ length: Math.floor(5 - +rating) }, (ele, index) => (
                                        <Star key={index} fill="#111" strokeWidth={1} stroke="#fff" size={20} />
                                    ))}

                                </span>
                            </p>
                            <p className="text-sm text-gray-500">{Comment || 'No comment provided.'}</p>
                        </div>
                        <CardFooter>
                            <p className="text-sm text-gray-400">User ID: {user.id}</p>
                        </CardFooter>
                    </Card>
                ))}

            </div>
            <div className='w-[95%]'>
                <Pagination pageCount={pageCount} pageNo={pageNo} totalitems={totalitems} />
            </div>
        </div>
    );
};

export default Reviews;