#!/usr/bin/env node
/**
 * Seed all sample data to MongoDB
 * Populates contacts, news, slides, and timeline collections
 */

// Load environment variables from .env.local
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '../.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  for (const line of lines) {
    if (line.trim() && !line.trim().startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      if (key.trim()) {
        process.env[key.trim()] = value;
      }
    }
  }
}

loadEnv();

async function main() {
  const { connectToDatabase } = require('../src/lib/mongodb');

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not set in environment');
    process.exit(1);
  }

  try {
    const { db, client } = await connectToDatabase();
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await db.collection('contacts').deleteMany({});
    await db.collection('news').deleteMany({});
    await db.collection('slides').deleteMany({});
    await db.collection('timeline').deleteMany({});

    // Seed contacts
    console.log('📝 Seeding contacts...');
    const contactsData = [
      {
        name: "Ahmed Hassan",
        email: "ahmed@example.com",
        phone: "+201001234567",
        subject: "Education Reform",
        message: "Great initiative on the education reform bill!",
        createdAt: new Date("2026-02-18T10:50:49Z")
      },
      {
        name: "Fatima Ibrahim",
        email: "fatima@example.com",
        phone: "+201112345678",
        subject: "Healthcare Services",
        message: "The healthcare infrastructure initiative is exactly what our area needs.",
        createdAt: new Date("2026-02-19T14:30:00Z")
      },
      {
        name: "Mohammed Karim",
        email: "karim@example.com",
        phone: "+201223456789",
        subject: "Youth Employment",
        message: "I'm interested in the youth employment program. How do I apply?",
        createdAt: new Date("2026-02-20T09:15:30Z")
      }
    ];
    const contactsRes = await db.collection('contacts').insertMany(contactsData);
    console.log(`  ✓ Inserted ${contactsRes.insertedCount} contacts`);

    // Seed news
    console.log('📰 Seeding news articles...');
    const newsData = [
      {
        slug: "new-education-reform-bill",
        title: "تقديم مشروع قانون إصلاح التعليم الجديد في البرلمان",
        excerpt: "مشروع قانون شامل لإصلاح التعليم يهدف إلى تحديث المناهج الوطنية وتحسين الوصول إلى التعليم الجيد.",
        date: "2026-02-15",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        body: "<p>قدّم النائب مشروع قانون تاريخي لإصلاح التعليم يسعى إلى إعادة هيكلة المنظومة التعليمية الوطنية.</p>"
      },
      {
        slug: "healthcare-infrastructure-initiative",
        title: "الإعلان عن مبادرة كبرى للبنية التحتية الصحية",
        excerpt: "خطة جريئة لبناء ٥٠ عيادة صحية جديدة في المناطق المحرومة.",
        date: "2026-02-10",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
        body: "<p>كشف النائب عن مبادرة شاملة للبنية التحتية الصحية ستوفر مرافق طبية حديثة.</p>"
      },
      {
        slug: "youth-employment-programme",
        title: "برنامج توظيف الشباب يصل إلى ١٠ آلاف مستفيد",
        excerpt: "برنامج طموح لتوظيف الشباب ويوفر التدريب والفرص الوظيفية في قطاعات متعددة.",
        date: "2026-02-05",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        body: "<p>أطلق النائب برنامجاً شاملاً لتوظيف الشباب في جميع أنحاء الدائرة.</p>"
      }
    ];
    const newsRes = await db.collection('news').insertMany(newsData);
    console.log(`  ✓ Inserted ${newsRes.insertedCount} news articles`);

    // Seed slides
    console.log('🖼️  Seeding hero slides...');
    const slidesData = [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=1920&q=80",
        title: "خدمة مصر بشرف وأمانة",
        subtitle: "ملتزمون ببناء مستقبل أقوى وأكثر ازدهاراً لكل مواطن مصري.",
        cta: { label: "اعرف المزيد", href: "/about" }
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1920&q=80",
        title: "التميز التشريعي",
        subtitle: "نتبنى تشريعات تحويلية تدفع عجلة التقدم الوطني والإصلاح.",
        cta: { label: "آخر الأخبار", href: "/news" }
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1920&q=80",
        title: "المجتمع أولاً",
        subtitle: "التواصل مع المجتمعات والاستماع والعمل وتحقيق التغيير الحقيقي.",
        cta: { label: "تواصل معنا", href: "/contact" }
      }
    ];
    const slidesRes = await db.collection('slides').insertMany(slidesData);
    console.log(`  ✓ Inserted ${slidesRes.insertedCount} slides`);

    // Seed timeline
    console.log('📅 Seeding timeline data...');
    const timelineData = [
      {
        year: "٢٠٢٤",
        title: "انتخابه عضواً بمجلس النواب المصري",
        description: "فاز بأغلبية ساحقة في الانتخابات البرلمانية، حاصلاً على تفويض شعبي لتمثيل الدائرة."
      },
      {
        year: "٢٠٢٣",
        title: "تأسيس مبادرة المجلس الوطني للشباب",
        description: "أنشأ منصة لإشراك الشباب تجمع أكثر من ٥٠٠٠ قيادة شابة."
      },
      {
        year: "٢٠٢١",
        title: "تعيينه مستشاراً للسياسات الاقتصادية",
        description: "تم اختياره كمستشار أول للسياسات الاقتصادية، حيث ساهم في صياغة الاستراتيجيات المالية."
      },
      {
        year: "٢٠١٩",
        title: "رئاسة لجنة البنية التحتية الوطنية",
        description: "ترأس اللجنة المسؤولة عن الإشراف على مشاريع البنية التحتية الكبرى."
      },
      {
        year: "٢٠١٧",
        title: "إطلاق مبادرة تمكين المرأة",
        description: "أطلق برنامجاً شاملاً لتدريب ١٠٠٠٠ امرأة على المهارات الحرفية والرقمية."
      }
    ];
    const timelineRes = await db.collection('timeline').insertMany(timelineData);
    console.log(`  ✓ Inserted ${timelineRes.insertedCount} timeline entries`);

    console.log('\n✅ All sample data seeded successfully!');
    console.log('\nSummary:');
    console.log(`  • Contacts: ${contactsRes.insertedCount}`);
    console.log(`  • News Articles: ${newsRes.insertedCount}`);
    console.log(`  • Slides: ${slidesRes.insertedCount}`);
    console.log(`  • Timeline Entries: ${timelineRes.insertedCount}`);

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
}

main();
