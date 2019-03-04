﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TalantOnboardingTask1_.Models;

namespace TalantOnboardingTask1_.Controllers
{
    public class ProductController : Controller
    {
       

       
        public ActionResult Index()
        {
            return View();
        }
        //customerList
        public JsonResult ProductList()
        {
            TalentEntities db = new TalentEntities();
            var ProductList = db.Product_.ToList();
            return new JsonResult { Data = ProductList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        //Create
        public JsonResult CreateProduct(Product_ c)
        {

            TalentEntities db = new TalentEntities();
            db.Product_.Add(c);
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //delete
        public JsonResult GetDeleteProduct(int id)
        {

            TalentEntities db = new TalentEntities();
            var Prod = db.Product_.Where(x => x.Id == id).SingleOrDefault();           
            return new JsonResult { Data = Prod, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult DeleteProduct(int id)
        {

            TalentEntities db = new TalentEntities();
            var Prod = db.Product_.Where(x => x.Id == id).SingleOrDefault();
            if (Prod != null)
            {
                db.Product_.Remove(Prod);
                db.SaveChanges();
            }

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult GetEdit(int id)
        {

            TalentEntities db = new TalentEntities();
            var Product = db.Product_.Where(x => x.Id == id).FirstOrDefault();
            return new JsonResult { Data = Product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult Edit(Product_ p)
        {

            TalentEntities db = new TalentEntities();
            var Prod = db.Product_.Where(x => x.Id == p.Id).SingleOrDefault();
            Prod.Name = p.Name;
            Prod.Price = p.Price;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


    }
}