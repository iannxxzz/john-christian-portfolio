import { useState } from "react"

import { useForm } from "react-hook-form"

import { motion } from "motion/react"

import emailjs from "@emailjs/browser"

import { fadeUp } from "@/lib/animations"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/SectionHeader"

type ContactFormValues = {
    name: string
    company: string
    email: string
    phone: string
    message: string
}

export const Contact = () => {
    const form = useForm<ContactFormValues>({
        defaultValues: {
            name: "",
            company: "",
            email: "",
            phone: "",
            message: "",
        },
    })

    const [isSending, setIsSending] = useState(false)

    const [status, setStatus] = useState<{
        type: "success" | "error" | null
        message: string
    }>({
        type: null,
        message: "",
    })

    const onSubmit = async (values: ContactFormValues) => {
        try {
            setIsSending(true)

            setStatus({
                type: null,
                message: "",
            })

            await emailjs.send(
                "service_sxi0jb5",
                "template_a3r933w",
                {
                    name: values.name,
                    company: values.company,
                    email: values.email,
                    phone: values.phone,
                    message: values.message,
                },
                "EdK9oPCvqnDu-GzbD"
            )

            setStatus({
                type: "success",
                message:
                    "Message sent successfully! I'll get back to you soon.",
            })

            form.reset()

            setTimeout(() => {
                setStatus({
                    type: null,
                    message: "",
                })
            }, 2000)
        } catch (error) {
            console.error(error)

            setStatus({
                type: "error",
                message:
                    "Failed to send message. Please try again later.",
            })
        } finally {
            setIsSending(false)
        }
    }

    return (
        <motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mt-32 mb-10 scroll-mt-10"
        >
            <SectionHeader
                subtitle="Contact"
                title="Let's Work Together!"
            />

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
                {/* Left Side */}
                <div className="flex flex-col justify-center">
                    <span className="text-sm font-medium text-primary">
                        Available for freelance and part-time work
                    </span>

                    <h3 className="mt-3 text-3xl font-bold">
                        Let's turn your ideas into reality.
                    </h3>

                    <p className="mt-4 max-w-md text-muted-foreground">
                        Looking for help with a website, portfolio, dashboard,
                        software QA testing, application support, data analysis,
                        or a custom web application? Send me a message and
                        let's discuss your project.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="rounded-2xl border p-4">
                            <p className="text-sm text-muted-foreground">
                                Email
                            </p>

                            <a
                                href="mailto:johnchristianatienza81@gmail.com"
                                className="font-medium transition-opacity hover:opacity-70"
                            >
                                johnchristianatienza81@gmail.com
                            </a>
                        </div>

                        <div className="rounded-2xl border p-4">
                            <p className="text-sm text-muted-foreground">
                                Location
                            </p>

                            <p className="font-medium">
                                Mandaue City, Cebu, Philippines
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative">
                    <div
                        aria-hidden="true"
                        className="absolute -inset-1 rounded-3xl bg-primary/10 blur-2xl"
                    />

                    <div className="relative rounded-3xl border bg-background/80 p-6 backdrop-blur-md md:p-8">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                                noValidate
                            >
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        rules={{
                                            required: "Name is required",
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Your Name"
                                                        aria-label="Your name"
                                                        autoComplete="name"
                                                        className="h-12 rounded-xl"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="company"
                                        rules={{
                                            required: "Company is required",
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Company"
                                                        aria-label="Company name"
                                                        autoComplete="organization"
                                                        className="h-12 rounded-xl"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        rules={{
                                            required: "Email is required",
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        aria-label="Email address"
                                                        autoComplete="email"
                                                        inputMode="email"
                                                        className="h-12 rounded-xl"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        rules={{
                                            required: "Phone is required",
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="+63 912 345 6789"
                                                        aria-label="Phone number"
                                                        autoComplete="tel"
                                                        inputMode="tel"
                                                        className="h-12 rounded-xl"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="message"
                                    rules={{
                                        required:
                                            "Your message is required!",
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell me about your project..."
                                                    aria-label="Project message"
                                                    autoComplete="off"
                                                    className="min-h-40 resize-none rounded-xl"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSending}
                                    aria-busy={isSending}
                                    className="h-12 w-full rounded-xl"
                                >
                                    {isSending
                                        ? "Sending..."
                                        : "Send Message"}
                                </Button>

                                {status.type && (
                                    <div
                                        role="status"
                                        aria-live="polite"
                                        aria-atomic="true"
                                        className={`rounded-xl p-4 text-sm ${
                                            status.type === "success"
                                                ? "border border-green-500/30 bg-green-500/10 text-green-400"
                                                : "border border-red-500/30 bg-red-500/10 text-red-400"
                                        }`}
                                    >
                                        {status.message}
                                    </div>
                                )}
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}