import Image from 'next/image';
import GridTextCard from '@/components/ui/GridTextCard';

export default function AboutPage() {
	return (
		<main className="min-h-screen bg-white font-chillax px-4 py-12">
			<section className="w-full flex justify-center items-center py-8 sm:py-12 bg-[#FAFAFA]">
				<div className="text-center max-w-2xl mx-auto" style={{ fontFamily: 'Chillax, sans-serif' }}>
					<h2 className="text-[#17214D] font-medium text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-snug">
						With expertise across<br className="sm:hidden" />
						ventures and enterprises,<br className="sm:hidden" />
						Synexis.ai delivers next. 
					</h2>
				</div>
				</section>

			{/* Team grid section */}
			<section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center  mt-8">
				{/* Background image grid */}
				<div className="absolute  w-full h-full">
					<Image
						src="/images/img14.png"
						alt="Team grid background"
						fill
						className="object-cover "
						priority
					/>
				</div>
			
			</section>
      <section className="w-full bg-white py-12">
  <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-20">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
      
      {/* Stat 1 */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">250+</h3>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Projects Completed</p>
      </div>

      {/* Stat 2 */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">180+</h3>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Happy Clients</p>
      </div>

      {/* Stat 3 */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">10+</h3>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Years of Experience</p>
      </div>

      {/* Stat 4 */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">50+</h3>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Team Members</p>
      </div>

    </div>
  </div>
</section>
	<section className="w-full flex justify-center items-center py-10 bg-white">
				<div
					className="max-w-3xl mx-auto "
					style={{
						fontFamily: 'Chillax, sans-serif',
						fontWeight: 300,
						fontStyle: 'Light',
						fontSize: '25px',
						lineHeight: '40px',
						letterSpacing: '-0.06px',
						verticalAlign: 'middle',
					}}
				>
					We collaborate with forward-thinking leaders, where our generative AI experts provide strategic insights that will reshape tomorrow. Our team of AI engineers, developers, and data scientists supports clients through their digital transformation, enhancing capabilities across their organization. With over 200 innovative solutions delivered and counting, we are dedicated to empowering businesses with cutting-edge generative AI expertise for a future-proof world.
				</div>
			</section>



				{/* Collaboration & Creativity Section */}
				<section className="w-full bg-[#17214D] py-16">
					<div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{/* First card: text only, custom background */}
							<div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col justify-center items-start p-8 bg-cover bg-center rounded-xl min-h-[260px]" >
								<h2 className="text-white font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: 'Chillax, sans-serif' }}>
									Where Collaboration<br />
									<span className="italic font-normal">Meets Creativity</span>
								</h2>
								<p className="text-white text-base sm:text-lg opacity-80 mt-2" style={{ fontFamily: 'Chillax, sans-serif' }}>
									We foster an open, inclusive culture where teamwork, smart thinking, and curiosity spark innovation—balancing growth, fun, and shared success.
								</p>
							</div>
							<div className="rounded-xl overflow-hidden bg-[#22306A] min-h-[260px] flex">
								<Image src="/images/grid_3.png" alt="Grid 3" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_5.jpg" alt="Grid 5" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_6.png" alt="Grid 6" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_8.png" alt="Grid 8" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_9.png" alt="Grid 9" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_11.png" alt="Grid 11" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_12.png" alt="Grid 12" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_14.png" alt="Grid 14" width={400} height={260} className="w-full h-full object-cover" />
							</div>
																				
																				
													
						</div>
					</div>
				</section>



		</main>
	);
}
        