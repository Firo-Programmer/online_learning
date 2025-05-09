"use client"

import { useState } from "react"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { ArrowRight, Check, CreditCard, Download, FileText, Gift, Info, Plus, Sparkles, Star } from "lucide-react"

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("plans")
  const [selectedPlan, setSelectedPlan] = useState("free")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleUpgrade = () => {
    toast({
      title: "Plan upgraded",
      description: "Your subscription has been successfully upgraded to Pro.",
    })
    setSelectedPlan("pro")
  }

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <DashboardHeader
          title="Billing & Subscription"
          description="Manage your subscription plan and payment methods"
        />

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="plans" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="plans" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Plans</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Payment Methods</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Billing History</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="plans">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
                  <p className="text-muted-foreground">Select the plan that best fits your learning needs</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Free Plan */}
                  <Card className={`border-2 ${selectedPlan === "free" ? "border-indigo-500" : "border-transparent"}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Free Plan</CardTitle>
                          <CardDescription>Basic access to learning resources</CardDescription>
                        </div>
                        <Badge variant="outline">Current Plan</Badge>
                      </div>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">$0</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Access to basic study materials</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Limited notes storage (100MB)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Basic AI assistance (10 questions/day)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Join up to 3 study groups</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" disabled>
                        Current Plan
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Pro Plan */}
                  <Card className={`border-2 ${selectedPlan === "pro" ? "border-indigo-500" : "border-transparent"}`}>
                    <CardHeader className="relative">
                      <div className="absolute -top-4 -right-4">
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0">
                          <Star className="h-3 w-3 mr-1 fill-white" /> Popular
                        </Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Pro Plan</CardTitle>
                          <CardDescription>Enhanced learning experience</CardDescription>
                        </div>
                        {selectedPlan === "pro" && <Badge variant="outline">Current Plan</Badge>}
                      </div>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">$9.99</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Everything in Free plan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Unlimited notes storage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Advanced AI assistance (unlimited)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Priority support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Ad-free experience</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Unlimited study groups</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {selectedPlan === "pro" ? (
                        <Button variant="outline" className="w-full" disabled>
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                          onClick={handleUpgrade}
                        >
                          Upgrade to Pro
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>

                {/* Student Discount */}
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-indigo-100 dark:border-indigo-800/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-full">
                        <Gift className="h-8 w-8 text-indigo-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">Student Discount Available</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Verify your student status and get 50% off any plan
                        </p>
                        <Button variant="outline" className="bg-white/80 dark:bg-gray-800/80">
                          Verify Student Status <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Payment Methods</h2>
                  <p className="text-muted-foreground">Manage your payment information</p>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Your Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Visa ending in 4242</p>
                            <Badge variant="outline">Default</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            Remove
                          </Button>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Add New Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                    <CardDescription>Your billing address for invoices and receipts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="john@example.com" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" defaultValue="123 Main St" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="New York" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input id="state" defaultValue="NY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip/Postal Code</Label>
                          <Input id="zip" defaultValue="10001" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <select id="country" className="w-full p-2 border rounded-md">
                          <option value="us">United States</option>
                          <option value="ca">Canada</option>
                          <option value="uk">United Kingdom</option>
                          <option value="au">Australia</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Address</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Billing History</h2>
                  <p className="text-muted-foreground">View and download your past invoices</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Invoices</CardTitle>
                    <CardDescription>Your billing history and receipts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Pro Plan Subscription</p>
                          <p className="text-sm text-muted-foreground">May 1, 2023</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">$9.99</p>
                          <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" /> PDF
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Pro Plan Subscription</p>
                          <p className="text-sm text-muted-foreground">April 1, 2023</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">$9.99</p>
                          <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" /> PDF
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Pro Plan Subscription</p>
                          <p className="text-sm text-muted-foreground">March 1, 2023</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">$9.99</p>
                          <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" /> PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center gap-2 mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/30 rounded-lg">
                  <Info className="h-5 w-5 text-amber-500" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    Need help with billing? Contact our support team at{" "}
                    <a href="mailto:support@example.com" className="underline">
                      support@example.com
                    </a>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
