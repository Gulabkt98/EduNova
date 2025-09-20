const Category = require("../models/Categories");

exports.createCategory = async (req, res) => {
    try {
        // fetch data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}; //api test done

// get all categories handler
// get all categories handler
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}, { name: true, description: true })
    return res.status(200).json({
      success: true,
      message: "All categories returned successfully",
      data: {             // wrap inside data object
        allCategories
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


//category page details handler
exports.categoryPageDetails = async (req, res) => {
    try {
        //get category id from req params
        const {categoryId} = req.body;
        //validation
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category id is required",
            });
        }
        //get course for the given category
        const categoryDetails = await Category.findById(categoryId)
                                   .populate("courses")
                                   .exec();

        //valiation for  course ans category
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category not found",
            });
        }

       
        //get course for the diffrenet  category
        const differentCategoryCourses = await Category.find({_id:{$ne:categoryId}})
                                                .populate("courses")
                                                .exec();
        //valiation for  course ans category
        if(!differentCategoryCourses){
            return res.status(404).json({
                success:false,
                message:"Courses not found for different category",
            });
        }

        //get top selling course
        const topSellingCourses = await Course.find({}).sort({sold: -1}).limit(10).exec();
        if(!topSellingCourses){
            return res.status(404).json({
                success:false,
                message:"Top selling courses not found",
            });
        }
        // return response
        return res.status(200).json({
            success: true,
            message: "Category page details fetched successfully",
            categoryDetails,
            differentCategoryCourses,
            topSellingCourses,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
